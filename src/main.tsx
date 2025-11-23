import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Ensure the CSS variable --navbar-height matches the real navbar height so
// maps and controls are offset correctly. This runs after the app mounts and
// updates on resize.
function updateNavbarHeight() {
	try {
		const nav = document.querySelector('nav');
		if (!nav) return;
		const h = nav.getBoundingClientRect().height;
		document.documentElement.style.setProperty('--navbar-height', `${h}px`);
	} catch (e) {
		// ignore
	}
}

// Run after next paint to ensure nav is rendered
requestAnimationFrame(() => {
	updateNavbarHeight();
	// also update a bit later in case of async layout
	setTimeout(updateNavbarHeight, 250);
});

window.addEventListener('resize', () => {
	updateNavbarHeight();
});
