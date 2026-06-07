import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uClick;
uniform float uClickTime;
uniform float uAspect;
uniform float uHover;

float circle(vec2 p, vec2 c, float r, float blur) {
  return 1.0 - smoothstep(r, r + blur, length((p - c) * vec2(uAspect, 1.0)));
}

float mist(vec2 uv) {
  float m1 = sin((uv.x * 1.8 + uTime * 0.035) * 6.28318) * 0.5 + 0.5;
  float m2 = sin((uv.y * 2.2 - uTime * 0.045) * 6.28318) * 0.5 + 0.5;
  float m3 = sin(((uv.x + uv.y) * 1.1 + uTime * 0.028) * 6.28318) * 0.5 + 0.5;
  return (m1 * 0.42 + m2 * 0.34 + m3 * 0.24);
}

void main() {
  vec2 uv = vUv;
  vec2 scaledMouse = uMouse;
  float distMouse = length((uv - scaledMouse) * vec2(uAspect, 1.0));

  vec3 base = vec3(0.032, 0.026, 0.038);
  float vignette = smoothstep(0.88, 0.22, length((uv - 0.5) * vec2(uAspect * 0.72, 1.0)));
  vec3 color = base + vec3(0.060, 0.044, 0.026) * vignette;

  float amberMist = mist(uv);
  color += vec3(0.64, 0.36, 0.16) * amberMist * 0.034;

  // Regular sparks — 20 with varied size, speed, twinkling, two color temps
  float sparksWarm = 0.0;
  float sparksGold = 0.0;
  for (int i = 0; i < 20; i++) {
    float fi = float(i);
    vec2 c = vec2(fract(sin(fi * 41.1) * 217.4), fract(sin(fi * 23.7) * 171.3));
    c.y = fract(c.y + uTime * (0.010 + fract(fi * 0.173) * 0.018));
    float r = 0.002 + fract(fi * 0.213) * 0.009;
    float bl = 0.008 + fract(fi * 0.317) * 0.018;
    float twinkle = sin(uTime * (1.2 + fract(fi * 0.279) * 2.2) + fi * 1.9) * 0.42 + 0.58;
    float s = circle(uv, c, r, bl) * twinkle * (0.5 + fract(fi * 0.427) * 0.5);
    float cf = fract(fi * 0.173);
    sparksWarm += s * (1.0 - cf * 0.5);
    sparksGold += s * cf * 0.5;
  }
  color += vec3(1.0, 0.58, 0.22) * sparksWarm * (0.078 + uHover * 0.024);
  color += vec3(1.0, 0.88, 0.52) * sparksGold * (0.060 + uHover * 0.018);

  // Accent sparks — 6 larger highlight stars
  float accentSparks = 0.0;
  for (int j = 0; j < 6; j++) {
    float fj = float(j + 20);
    vec2 ac = vec2(fract(sin(fj * 67.3) * 413.7), fract(sin(fj * 51.9) * 287.4));
    ac.y = fract(ac.y + uTime * (0.007 + fract(fj * 0.21) * 0.010));
    float ar = 0.006 + fract(fj * 0.37) * 0.007;
    float abl = 0.014 + fract(fj * 0.43) * 0.018;
    float atw = sin(uTime * (0.7 + fract(fj * 0.19) * 1.0) + fj * 3.1) * 0.5 + 0.5;
    accentSparks += circle(uv, ac, ar, abl) * atw;
  }
  color += vec3(1.0, 0.92, 0.70) * accentSparks * 0.10;

  // Hero crown — warm radial anchored at top center
  vec2 heroFocus = vec2(0.5, 0.95);
  float heroRadial = exp(-length((uv - heroFocus) * vec2(uAspect * 0.38, 0.52)) * 1.9);
  heroRadial *= smoothstep(0.30, 0.90, uv.y);
  color += vec3(0.92, 0.55, 0.22) * heroRadial * 0.088;

  // Light rays — triple frequency, fanned beams slowly counter-rotating
  vec2 rayOrigin = vec2(0.5, 1.14);
  vec2 toRay = uv - rayOrigin;
  float rayAngle = atan(toRay.x * uAspect, -toRay.y);
  float rayDist = length(toRay * vec2(uAspect * 0.55, 1.0));
  float rayFade = smoothstep(1.3, 0.08, rayDist) * smoothstep(0.0, 0.18, rayDist);
  float rayBand = sin(rayAngle * 5.0 + uTime * 0.055) * 0.5 + 0.5;
  float rayBand2 = sin(rayAngle * 8.0 - uTime * 0.038) * 0.5 + 0.5;
  float rayBand3 = sin(rayAngle * 3.0 + uTime * 0.028) * 0.5 + 0.5;
  float lightRays = pow(rayBand, 3.0) * rayFade * 0.075
                  + pow(rayBand2, 5.0) * rayFade * 0.032
                  + pow(rayBand3, 6.5) * rayFade * 0.018;
  color += vec3(0.88, 0.52, 0.20) * lightRays;

  float mouseGlow = exp(-distMouse * 3.8);
  float mouseAura = exp(-distMouse * 2.2);
  float softHalo = circle(uv, scaledMouse, 0.18 + uHover * 0.04, 0.32);
  color += vec3(0.88, 0.50, 0.20) * mouseGlow * (0.032 + uHover * 0.052);
  color += vec3(0.68, 0.38, 0.15) * mouseAura * (0.018 + uHover * 0.030);
  color += vec3(0.92, 0.58, 0.26) * softHalo * (0.034 + uHover * 0.055);

  float age = clamp(uTime - uClickTime, 0.0, 3.0);
  float clickDist = length((uv - uClick) * vec2(uAspect, 1.0));
  float ring = smoothstep(0.022, 0.0, abs(clickDist - age * 0.2)) * smoothstep(1.55, 0.0, age);
  color += vec3(1.0, 0.62, 0.22) * ring * 0.24;

  gl_FragColor = vec4(color, 0.84);
}
`;

export function AmbientLightField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const startTime = performance.now();
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uClick: { value: new THREE.Vector2(0.5, 0.5) },
      uClickTime: { value: -10 },
      uAspect: { value: 1 },
      uHover: { value: 0 },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(geometry, material));

    const setSize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(w, h, false);
      uniforms.uAspect.value = w / h;
    };

    const smoothMouse = { x: 0.5, y: 0.5 };
    const hoverState = { value: 0 };
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;

      const target = event.target instanceof Element ? event.target : null;
      const isInteractive = Boolean(
        target?.closest('a, button, input, textarea, .map-card, .magic-bento-card, .circular-gallery-card, .scenario-star-pill'),
      );
      gsap.to(smoothMouse, {
        x: event.clientX / window.innerWidth,
        y: 1 - event.clientY / window.innerHeight,
        duration: 1.15,
        ease: 'power2.out',
        overwrite: true,
        onUpdate: () => uniforms.uMouse.value.set(smoothMouse.x, smoothMouse.y),
      });
      gsap.to(hoverState, {
        value: isInteractive ? 1 : 0,
        duration: 0.55,
        ease: 'power2.out',
        overwrite: true,
        onUpdate: () => {
          uniforms.uHover.value = hoverState.value;
        },
      });
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;

      uniforms.uClick.value.set(event.clientX / window.innerWidth, 1 - event.clientY / window.innerHeight);
      uniforms.uClickTime.value = uniforms.uTime.value;
    };

    const render = (time = performance.now()) => {
      uniforms.uTime.value = (time - startTime) / 1000;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };

    let rafId = 0;
    setSize();
    render();
    window.addEventListener('resize', setSize);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', setSize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-100"
    />
  );
}
