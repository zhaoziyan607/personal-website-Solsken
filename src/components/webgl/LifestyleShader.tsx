import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = /* glsl */ `
varying vec2 vUv;
uniform float uTime;
uniform vec2  uMouse;
uniform float uIntensity;
uniform float uAspect;

void main() {
  vec2 uv = vUv;

  // 距离（乘以宽高比避免椭圆失真）
  float dist = length((uv - uMouse) * vec2(uAspect, 1.0));

  // 从鼠标发出的正弦涟漪，随距离指数衰减
  float ripple = sin(dist * 18.0 - uTime * 4.0)
               * exp(-dist * 5.0)
               * uIntensity;

  // 位移扭曲
  vec2 dir = normalize(uv - uMouse + vec2(0.0001));
  vec2 dUv = uv + dir * ripple * 0.025;

  // 基础有机噪声（双正弦叠加）
  float noise = sin(dUv.x * 9.0 + uTime * 0.40)
              * sin(dUv.y * 7.0 + uTime * 0.25)
              * 0.04;

  // 暖色深色基底（接近 ink #1a1a1a，略带暖意）
  vec3 col = vec3(0.102, 0.090, 0.082)
           + vec3(noise * 0.28, noise * 0.14, noise * 0.08);

  // 光标处极淡暖辉（accent #c45c3e 色温）
  float glow = exp(-dist * 9.0) * uIntensity * 0.06;
  col += vec3(glow * 0.80, glow * 0.28, glow * 0.10);

  gl_FragColor = vec4(col, 1.0);
}
`;

export function LifestyleShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Three.js 初始化，不支持 WebGL 则静默退出
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime:      { value: 0 },
      uMouse:     { value: new THREE.Vector2(0.5, 0.5) },
      uIntensity: { value: 0.15 },
      uAspect:    { value: 1 },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    scene.add(new THREE.Mesh(geometry, material));

    const setSize = () => {
      const w = canvas.clientWidth || canvas.offsetWidth;
      const h = canvas.clientHeight || canvas.offsetHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      uniforms.uAspect.value = w / h;
    };
    setSize();

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(canvas);

    // 用 canvas.parentElement（section）监听事件，canvas 本身 pointer-events:none
    const section = canvas.parentElement;
    const smoothMouse = { x: 0.5, y: 0.5 };
    let idleTimer: gsap.core.Tween | null = null;

    const handlePointer = (nx: number, ny: number) => {
      if (idleTimer) idleTimer.kill();
      gsap.to(smoothMouse, {
        x: nx,
        y: ny,
        duration: 0.7,
        ease: 'power2.out',
        onUpdate: () => uniforms.uMouse.value.set(smoothMouse.x, smoothMouse.y),
      });
      gsap.to(uniforms.uIntensity, { value: 1.0, duration: 0.3, overwrite: true });
      idleTimer = gsap.to(uniforms.uIntensity, { value: 0.15, duration: 1.5, delay: 1.5 });
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = (section ?? canvas).getBoundingClientRect();
      handlePointer(
        (e.clientX - rect.left) / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height,
      );
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect = (section ?? canvas).getBoundingClientRect();
      handlePointer(
        (touch.clientX - rect.left) / rect.width,
        1.0 - (touch.clientY - rect.top) / rect.height,
      );
    };

    const target = section ?? canvas;
    target.addEventListener('mousemove', onMouseMove as EventListener);
    target.addEventListener('touchmove', onTouchMove as EventListener, { passive: true });

    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      uniforms.uTime.value += 0.016;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      target.removeEventListener('mousemove', onMouseMove as EventListener);
      target.removeEventListener('touchmove', onTouchMove as EventListener);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
