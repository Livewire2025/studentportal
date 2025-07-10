import { Link } from "react-router-dom";

export default function Frontpage() {
  return (
    <>
      <img src="src/assets/log1.png" alt="" width="90px" />
      <section
        class="hero"
        aria-label="Welcome to LiveWire student exam portal front page hero section"
      >
        <div class="hero-content">
          <h1 class="hero-title">Livewire Learner's License</h1>
          <p class="hero-subtitle">
            Get started with your exams in just few steps.Our student portal is
            designed to help you register to attempt online test,track results
            and instantly download your certificates.Let's make learning
            happier,together!
          </p>
          <Link to="/register">
            <button
              class="btn-primary"
              type="button"
              aria-label="Get Started with LiveWire student exam portal"
            >
              Get Started
            </button>
          </Link>
        </div>
        <div class="hero-image-container">
          <img
            src="examportalim.png"
            alt="Modern and dynamic illustration showing students interacting with digital exam portal - laptops, study material, check marks emphasizing successful exam completion in vibrant colors with clean style"
            class="hero-image"
            onerror="this.onerror=null;this.src='https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/73cff934-e0bd-4662-9849-a07e3e3d6c76.png';"
          />
        </div>
      </section>
    </>
  );
}
