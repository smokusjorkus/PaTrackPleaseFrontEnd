import { Renderer, Camera, Geometry, Program, Mesh, Color, Vec2 } from "ogl";
import { useEffect, useRef } from "react";

const vertex = `
  attribute vec2 uv;
  attribute vec3 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragment = `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.5;
    
    // Create the "Balatro" wavy effect
    float noise = sin(uv.x * 3.0 + t) * cos(uv.y * 3.0 + t);
    vec3 finalColor = mix(uColor1, uColor2, uv.x + noise);
    finalColor = mix(finalColor, uColor3, uv.y);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function Balatro({
  color1 = "#DE443B",
  color2 = "#006BB4",
  color3 = "#162325",
}) {
  const containerRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer({ alpha: true, antialias: true });
    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);

    const geometry = new Geometry(gl, {
      position: {
        size: 3,
        data: new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]),
      },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new Color(color1) },
        uColor2: { value: new Color(color2) },
        uColor3: { value: new Color(color3) },
        uMouse: { value: new Vec2(0, 0) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", resize);
    resize();

    let id;
    const update = (t) => {
      id = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    };
    id = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(id);
      if (containerRef.current && gl.canvas.parentNode) {
        containerRef.current.removeChild(gl.canvas);
      }
    };
  }, [color1, color2, color3]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
