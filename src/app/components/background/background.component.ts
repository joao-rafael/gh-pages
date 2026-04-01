import {
  Component, OnInit, OnDestroy, ElementRef,
  ViewChild, AfterViewInit, NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundService, BackgroundEffect } from '../../services/background.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #canvas class="bg-canvas" aria-hidden="true"></canvas>`,
  styles: [`
    .bg-canvas {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 0;
    }
  `]
})
export class BackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private animFrame!: number;
  private primaryColor = '#2D54DF';
  private effect: BackgroundEffect;

  constructor(
    private bgService: BackgroundService,
    private themeService: ThemeService,
    private ngZone: NgZone
  ) {
    this.effect = bgService.selectedEffect;
  }

  ngAfterViewInit(): void {
    this.primaryColor = this.themeService.getCurrentTheme().primary;
    this.initCanvas();
    this.ngZone.runOutsideAngular(() => this.startEffect());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animFrame);
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.ctx = canvas.getContext('2d')!;

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) }
             : { r: 45, g: 84, b: 223 };
  }

  private startEffect(): void {
    switch (this.effect) {
      case 'blob':      return this.runBlob();
      case 'rain':      return this.runRain();
      case 'particles': return this.runParticles();
    }
  }

  // ─────────────────────────────────────────────
  // BLOB
  // ─────────────────────────────────────────────
  private runBlob(): void {
    const { r, g, b } = this.hexToRgb(this.primaryColor);
    const W = () => this.canvasRef.nativeElement.width;
    const H = () => this.canvasRef.nativeElement.height;

    const blobs = [
      { x: 0.8, y: 0.1, r: 0.38, dx: 0.0003, dy: 0.00018, phase: 0,    opacity: 0.22 },
      { x: 0.1, y: 0.8, r: 0.32, dx: -0.00022, dy: -0.0003, phase: 2,  opacity: 0.18 },
      { x: 0.5, y: 0.45, r: 0.26, dx: 0.00015, dy: 0.00025, phase: 4,  opacity: 0.12 },
    ];

    let t = 0;
    const draw = () => {
      this.ctx.clearRect(0, 0, W(), H());
      t++;

      for (const blob of blobs) {
        blob.x += blob.dx;
        blob.y += blob.dy;
        if (blob.x > 1.1 || blob.x < -0.1) blob.dx *= -1;
        if (blob.y > 1.1 || blob.y < -0.1) blob.dy *= -1;

        const pulse = 1 + 0.06 * Math.sin(t * 0.01 + blob.phase);
        const cx = blob.x * W();
        const cy = blob.y * H();
        const rad = blob.r * Math.min(W(), H()) * pulse;

        const grad = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        grad.addColorStop(0, `rgba(${r},${g},${b},${blob.opacity})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

        this.ctx.filter = 'blur(60px)';
        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.filter = 'none';
      this.animFrame = requestAnimationFrame(draw);
    };
    draw();
  }

  // ─────────────────────────────────────────────
  // RAIN
  // ─────────────────────────────────────────────
  private runRain(): void {
    const { r, g, b } = this.hexToRgb(this.primaryColor);
    const W = () => this.canvasRef.nativeElement.width;
    const H = () => this.canvasRef.nativeElement.height;

    // Camada 1: gotas finas e rápidas
    const thinDrops = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      length: 0.06 + Math.random() * 0.09,
      opacity: 0.12 + Math.random() * 0.2,
      width: 0.8 + Math.random() * 1.2,
    }));

    // Camada 2: gotas largas e lentas (profundidade)
    const thickDrops = Array.from({ length: 25 }, () => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.001 + Math.random() * 0.002,
      length: 0.12 + Math.random() * 0.16,
      opacity: 0.08 + Math.random() * 0.14,
      width: 2 + Math.random() * 3,
    }));

    const drawDrop = (d: typeof thinDrops[0]) => {
      const x = d.x * W();
      const y = d.y * H();
      const len = d.length * H();
      const grad = this.ctx.createLinearGradient(x, y, x, y + len);
      grad.addColorStop(0,   `rgba(${r},${g},${b},0)`);
      grad.addColorStop(0.3, `rgba(${r},${g},${b},${d.opacity})`);
      grad.addColorStop(0.7, `rgba(${r},${g},${b},${d.opacity})`);
      grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = d.width;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x, y + len);
      this.ctx.stroke();
    };

    const draw = () => {
      this.ctx.clearRect(0, 0, W(), H());

      for (const d of thickDrops) {
        d.y += d.speed;
        if (d.y > 1.1) { d.y = -d.length; d.x = Math.random(); }
        drawDrop(d);
      }
      for (const d of thinDrops) {
        d.y += d.speed;
        if (d.y > 1.1) { d.y = -d.length; d.x = Math.random(); }
        drawDrop(d);
      }

      this.animFrame = requestAnimationFrame(draw);
    };
    draw();
  }

  // ─────────────────────────────────────────────
  // PARTICLES (pontos luminosos flutuantes)
  // ─────────────────────────────────────────────
  private runParticles(): void {
    const { r, g, b } = this.hexToRgb(this.primaryColor);
    const W = () => this.canvasRef.nativeElement.width;
    const H = () => this.canvasRef.nativeElement.height;

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 1 + Math.random() * 3,
      opacity: 0.05 + Math.random() * 0.18,
      dx: (Math.random() - 0.5) * 0.0004,
      dy: (Math.random() - 0.5) * 0.0004,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.01 + Math.random() * 0.02,
    }));

    let t = 0;
    const draw = () => {
      this.ctx.clearRect(0, 0, W(), H());
      t++;

      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;

        const pulse = 1 + 0.4 * Math.sin(t * p.pulseSpeed + p.phase);
        const opacity = p.opacity * pulse;
        const cx = p.x * W();
        const cy = p.y * H();
        const rad = p.radius * pulse;

        const grad = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, rad * 4);
        grad.addColorStop(0, `rgba(${r},${g},${b},${opacity})`);
        grad.addColorStop(0.4, `rgba(${r},${g},${b},${opacity * 0.4})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, rad * 4, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.animFrame = requestAnimationFrame(draw);
    };
    draw();
  }
}
