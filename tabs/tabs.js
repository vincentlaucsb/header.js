class Tabber {
    constructor(name) {
        this.target = document.getElementById(name);
        this.nav_bar = document.querySelector("nav#" + name + "-menu");      
        this.active_section = null;
        
        if (!this.target) {
            throw "Couldn't find an element with id " + name;            
        }
        
        if (!this.nav_bar) {
            throw "Couldn't find a <nav id='" + name + "-menu'> element to populate with tabs";
        } else {
            // Add class="tab-menu" to <nav>
            this.nav_bar.classList.add("tab-menu");
        }
        
        this.process_sections();
    }
    
    get sections() {
        var temp = [];
        for (var i = 0; i < this.target.childNodes.length; i++) {
            const node = this.target.childNodes[i];
            if (node.tagName == "SECTION") {
                // Add class="tab" to <section>
                node.classList.add("tab");
                temp.push(node);
            }
        }        
        
        return temp;
    }
    
    get links() {
        // Return all <a> tags under <nav>
        return this.nav_bar.getElementsByTagName("a");
    }
    
    process_sections() {
        const tabber = this;
        
        for (var i = 0; i < this.sections.length; i++) {
            var sect = this.sections[i];
            var link = document.createElement("a");
            var title = sect.dataset.title;
            
            if (!title) {
                throw "Please set a title for section " + i.toString();
            }

            link.innerHTML = title;
            
            // Store data
            sect.dataset.target = i;
            link.dataset.target = i;
            
            link.addEventListener("click", function(event) {
                // Use anonymous function to pass class instance into trigger
                Tabber.click_handler(tabber, event);
            });
        
            // Add to menu
            this.nav_bar.appendChild(link);
        
            if (this.active_section) {
                sect.style.display = "none";
            } else {
                Tabber.toggle(this, i);
            }
        }
    }
    
    static click_handler(tabber, event) {
        Tabber.toggle(tabber, event.target.dataset.target);
    }
    
    static toggle(tabber, target_id) {
        // Switch active tab
        const link = tabber.links[target_id];
        const target = tabber.sections[target_id];
        
        if (target.style.display == "none" && tabber.active_section) {
            // Deactive previous section
            var active_target_id = tabber.active_section.dataset.target;
            tabber.active_section.style.display = "none";
            tabber.links[active_target_id].classList.remove("active");
        }
        
        link.classList.add("active");
        tabber.active_section = target;
        target.style.display = "";
    }
}