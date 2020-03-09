function initRoll() {
    const rolls = document.querySelectorAll(".roll");

    rolls.forEach(roll => {
        // Elements of a roll
        // -------------------------------------------

        const wrap = roll.querySelector(".roll-wrap");
        const arrows = roll.querySelectorAll(".roll-arrow");
        const panes = roll.querySelectorAll(".roll-pane");
        const dots = roll.querySelectorAll(".roll-dot");

        // Capture clicks
        // -------------------------------------------

        arrows.forEach(arrow => {
            arrow.addEventListener("click", arrowTrigger);
        });

        document.onkeyup = function(e) {
            switch (e.keyCode) {
                case 9:
                    // On tab focus set the active roll
                    setActiveRoll();
                    break;
                case 37:
                    // On left arrow keyboard click, simulate roll arrow mouse click
                    document
                        .querySelector(".roll.is-active .roll-arrow-left")
                        .click();
                    break;
                case 39:
                    // On right arrow keyboard click, simulate roll arrow mouse click
                    document
                        .querySelector(".roll.is-active .roll-arrow-right")
                        .click();
                    break;
            }
        };

        // Functions
        // -------------------------------------------

        function animate(step) {
            const value = -(step * 100);
            wrap.style.transform = `translateX( ${value}%)`;
        }

        function setStep(step) {
            roll.dataset.step = step;
        }

        // Hide arrow if roll can no longer move in a given direction
        // Use 'visibility' instead of 'display' so it doesn't lose focus
        // and move it to the next available element
        function hideArrow(step) {
            arrows[0].style.visibility = step == 0 ? "hidden" : "visible";
            arrows[1].style.visibility =
                step == panes.length - 1 ? "hidden" : "visible";
        }

        // Determine which roll is active, sets "is-active" class
        function setActiveDot(step) {
            dots.forEach(({ classList }) => {
                classList.remove("is-active");
            });
            dots[step].classList.add("is-active");
        }

        // Determine which roll is active, sets "is-active" class
        function setActiveRoll() {
            rolls.forEach(({ classList }) => {
                classList.remove("is-active");
            });
            const focusedEl = document.activeElement;
            focusedEl.closest(".roll").classList.add("is-active");
        }

        // Mouse click on arrow
        function arrowTrigger(e) {
            const direction = parseInt(this.dataset.dir);
            const oldStep = parseInt(roll.dataset.step);
            const step = oldStep + -direction;
            // Focus not added automatically by Firefox
            // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
            this.focus();
            updateRoll(step);
        }

        // Mouse click on dot
        function dotTrigger(e) {
            const step = this.dataset.step;
            // Focus not added automatically by Firefox
            // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
            this.focus();
            updateRoll(step);
        }

        // Updates the active roll
        function updateRoll(step) {
            if (step < panes.length && step > -1) {
                setActiveRoll();
                animate(step);
                setStep(step);
                setActiveDot(step);
                hideArrow(step);
            }
        }
    });
}

initRoll();
