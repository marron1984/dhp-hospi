export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec3 uColor;

  varying vec2 vUv;

  // Simplex-like noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                   + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                             dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 centeredUv = (uv - 0.5) * vec2(aspect, 1.0);

    // Aggressive turbulent noise — fast, multi-octave swirl
    float t = uTime;
    float noise1 = snoise(centeredUv * 4.0 + vec2(t * 0.8, t * -0.5));
    float noise2 = snoise(centeredUv * 7.0 - vec2(t * 0.6, t * 0.9));
    float noise3 = snoise(centeredUv * 12.0 + vec2(t * 1.2, t * -0.7));
    float noise4 = snoise(centeredUv * 20.0 + vec2(t * -1.5, t * 1.1));

    // Weighted blend with high-frequency detail
    float combinedNoise = noise1 * 0.35 + noise2 * 0.3 + noise3 * 0.2 + noise4 * 0.15;

    // Swirl distortion for organic liquid feel
    float swirl = snoise(centeredUv * 2.5 + t * 0.4) * 0.3;
    combinedNoise += swirl;

    // Progress-based reveal — faster, sharper dissolve
    float threshold = uProgress * 2.8 - 0.8;
    float edge = smoothstep(threshold - 0.15, threshold + 0.05, combinedNoise);

    // Bright, warm base color with luminous gradient
    vec3 baseColor = uColor;
    vec3 brightColor = uColor * 1.6 + vec3(0.15, 0.08, 0.05);
    vec3 finalColor = mix(baseColor, brightColor, 0.6 + 0.4 * noise1);

    // Hot white edge glow — wide, intense
    float edgeGlow = smoothstep(threshold - 0.12, threshold, combinedNoise)
                   - smoothstep(threshold, threshold + 0.12, combinedNoise);
    finalColor += vec3(1.0, 0.95, 0.9) * edgeGlow * 4.0;

    // Secondary orange spark along edge
    float spark = smoothstep(threshold - 0.03, threshold, combinedNoise)
                - smoothstep(threshold, threshold + 0.03, combinedNoise);
    finalColor += vec3(1.0, 0.6, 0.2) * spark * 3.0;

    // Pulsating brightness
    float pulse = 1.0 + sin(t * 3.0) * 0.06;
    finalColor *= pulse;

    float alpha = 1.0 - edge;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;
