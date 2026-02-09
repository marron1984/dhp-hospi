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

    // Create flowing liquid noise
    float noise1 = snoise(centeredUv * 3.0 + uTime * 0.3);
    float noise2 = snoise(centeredUv * 5.0 - uTime * 0.2);
    float noise3 = snoise(centeredUv * 8.0 + uTime * 0.15);

    float combinedNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;

    // Progress-based reveal (dissolve effect)
    float threshold = uProgress * 2.2 - 0.6;
    float edge = smoothstep(threshold - 0.3, threshold + 0.1, combinedNoise);

    // Color with subtle gradient
    vec3 baseColor = uColor;
    vec3 darkColor = uColor * 0.3;
    vec3 finalColor = mix(darkColor, baseColor, 0.5 + 0.5 * noise1);

    // Add edge glow
    float edgeGlow = smoothstep(threshold - 0.05, threshold, combinedNoise)
                   - smoothstep(threshold, threshold + 0.05, combinedNoise);
    finalColor += vec3(1.0, 0.9, 0.85) * edgeGlow * 2.0;

    float alpha = 1.0 - edge;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;
