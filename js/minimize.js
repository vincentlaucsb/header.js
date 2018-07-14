function ClassChanger(
    class_name,
    trigger,
    target,
    minimize_text = "Minimize Preview",
    restore_text = "Restore Preview"
) {
    this.trigger = trigger;
    this.target = target;
    this.class_name = class_name;
    this.minimize_text = minimize_text;
    this.restore_text = restore_text;
    
    trigger.innerHTML = minimize_text;
    
    trigger.addEventListener("click", function() {
        if (target.classList.contains(class_name)) {
            target.classList.remove(class_name);
            trigger.innerHTML = minimize_text;
        } else {
            target.classList.add(class_name);
            trigger.innerHTML = restore_text;
        }
    });
}

function Minimizer(
    trigger,
    target,
    minimize_text = "Minimize Preview",
    restore_text = "Restore Preview"
    ) {
        return new ClassChanger("minimized", trigger, target, minimize_text, restore_text);
    }