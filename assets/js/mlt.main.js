const nodes = {
    navigation: document.querySelector('.resource-grid'),
    itemsList: document.querySelector('.nav-items'),
    itemsToggleLeft: document.querySelector('.nav-btn.btn-left'),
    itemsToggleRight: document.querySelector('.nav-btn.btn-right'),

    infoWrapper: document.querySelector('.resource-info-wrapper'),
    itemName: document.querySelector('.item-name span'),
    itemDesc: document.querySelector('.item-desc span'),
    itemSrc: document.querySelector('.item-src span a'),
    itemHome: document.querySelector('.item-home span a')
}

const dataBase = {
    uri: 'assets/data/data.json',
    get url() {
        return this.uri;
    }
}

// // Click events on the item buttons
// nodes.navigation.addEventListener('click', (event) => {
//     const currentItem = event.target;

//     // When event.target is a resource-item
//     if (currentItem.classList.contains('resource-item')) {
//         currentItem.classList.toggle('active');

//         event.currentTarget.querySelectorAll('.resource-item').forEach((resourceItem) => {
//             if (resourceItem !== currentItem) {
//                 resourceItem.classList.remove('active');
//             }
//         });
//     };
// });

class Item {
    constructor(id, label, name, desc, src, home) {
        this.data = {
            id: id,
            label: label,
            name: name,
            desc: desc,
            src: src,
            home: home
        },
        this.button = this.createButton();
    }

    createButton() {
        const button = document.createElement('div');

        button.dataset.id = this.data.id; // button.id = this.data.id;
        button.classList.add('resource-item');
        button.innerHTML = this.data.label;
        button.setAttribute("role", "button");

        button.addEventListener('click', (event) => {
            this.button.classList.toggle('active');
            
            nodes.itemsList.querySelectorAll('.resource-item').forEach((resourceItem) => {
                if (resourceItem !== this.button) resourceItem.classList.remove('active');
            });

            if (this.button.classList.contains('active')) {
                nodes.infoWrapper.classList.add('active');
            } else {
                nodes.infoWrapper.classList.remove('active');
            }

            this.addItemDataToDom();
        });

        return button;
    }

    addButtonToDom () {
        nodes.itemsList.appendChild(this.button);
    }

    addItemDataToDom () {
        const { name, desc, src, home } = this.data;
        nodes.itemName.innerHTML = name;
        nodes.itemDesc.innerHTML = desc;
        nodes.itemSrc.innerHTML = src.replace('metalevel-tech', 'mlt').replace(/(\/|-|\.)/g, '&#8203;$1&#8203;');
        nodes.itemSrc.href = `https://${src}`;
        nodes.itemHome.innerHTML = home.replace(/\/github/, '').replace(/(\/|-|\.)/g, '&#8203;$1&#8203;');
        nodes.itemHome.href = `https://${home}`;
    }

    static itemsArray = [];
    static visibleItems = [];

    static addItemsButtonsToDom = (() => {
        let itemsCount = 1;
        let itemsCountLast = 0;
        let itemsListWidth = nodes.itemsList.offsetWidth;
        
        return function() {
            itemsListWidth = nodes.itemsList.offsetWidth;
            
            if (itemsListWidth > 860) itemsCount = 4;
            else if (itemsListWidth > 640) itemsCount = 3;
            else if (itemsListWidth > 420) itemsCount = 2;
            else itemsCount = 1;
            
            // If the array is empty generate initial list of items
            if (this.visibleItems.length === 0) {
                for (let i = 0; i < itemsCount; i++) {
                    this.visibleItems.push(this.itemsArray[i]);
                }
            }
            
            if ((itemsCount !== itemsCountLast) || (itemsCount !== this.visibleItems.length)) {
                itemsCountLast = itemsCount;
                nodes.itemsList.innerHTML = '';
                
                // Check does there are items to be removed or added
                let itemsToAddOrRemove = this.visibleItems.length - itemsCount;

                if (itemsToAddOrRemove > 0) {
                    for (let i = 0; i < itemsToAddOrRemove; i++) {
                        const removedItem = this.visibleItems.pop();
                        // removedItem.button.remove();
                        
                        // If the removed item is active, activate the new last item
                        if (removedItem.button.classList.contains('active')) {
                            removedItem.button.classList.remove('active');
                            this.visibleItems[this.visibleItems.length - 1].button.click(); //classList.add('active');
                        }
                    }
                } else if (itemsToAddOrRemove < 0) {   
                    itemsToAddOrRemove *= -1;                 
                    for (let i = 0; i < itemsToAddOrRemove; i++) {
                        const lastVisibleItem = this.visibleItems[this.visibleItems.length - 1];
                        const lastVisibleItemIndex = this.itemsArray.indexOf(lastVisibleItem);
                        
                        if ((lastVisibleItemIndex + 1) < this.itemsArray.length) {
                            this.visibleItems.push(this.itemsArray[lastVisibleItemIndex + 1]);
                        } else {
                            this.visibleItems.push(this.itemsArray[0]);
                        }
                    }
                }

                // Display the current state of the list
                this.showVisibleItems();
            }
        };
    })();

    static showVisibleItems = (() => {
        this.visibleItems.forEach((item) => {
            item.addButtonToDom();
        });
    });

    static toggleItemsLeft = (() => {
        // Add new item to the beginning of the visibleItems
        const lastVisibleItem = this.visibleItems[this.visibleItems.length - 1];
        const lastVisibleItemIndex = this.itemsArray.indexOf(lastVisibleItem);
        const newLastVisibleItemIndex =
            (lastVisibleItemIndex < this.itemsArray.length - 1) ? lastVisibleItemIndex + 1 : 0;
        
        this.visibleItems.push(this.itemsArray[newLastVisibleItemIndex]);  
        
        // Remove one item at the beginning of the visibleItems
        const removedItem = this.visibleItems.shift();
        removedItem.button.remove();

        // If the removed item is active, activate the new last item
        if (removedItem.button.classList.contains('active')) {
            removedItem.button.classList.remove('active');
            this.visibleItems[0].button.click(); //classList.add('active');
        }
        
        this.showVisibleItems();
    });

    static toggleItemsRight = (() => { 
        // Add new item to the beginning of the visibleItems
        const firstVisibleItem = this.visibleItems[0];
        const firstVisibleItemIndex = this.itemsArray.indexOf(firstVisibleItem);
        const newFirstVisibleItemIndex =
            (firstVisibleItemIndex > 0) ? firstVisibleItemIndex - 1 : this.itemsArray.length - 1;

        this.visibleItems.unshift(this.itemsArray[newFirstVisibleItemIndex]);  

        // Remove one item at the end of the visibleItems
        const removedItem = this.visibleItems.pop();
        removedItem.button.remove();

        // If the removed item is active, activate the new last item
        if (removedItem.button.classList.contains('active')) {
            removedItem.button.classList.remove('active');
            this.visibleItems[this.visibleItems.length - 1].button.click(); //classList.add('active');
        }
        
        // Display the current state of the list
        this.showVisibleItems();
    });

    static getItemsData = async () => {
        try {
            const response = await fetch(dataBase.url);
            if (!response.ok) throw new Error(`Network error: ${response.statusText}`);

            const data = await response.json();

            data.forEach(item => {
                item = new this(item.id, item.label, item.name, item.desc, item.src, item.home);
                this.itemsArray.push(item);
            });

            // Randomize the items array
            this.itemsArray.sort(() => Math.random() - 0.5);

            // Add items to the DOM
            this.addItemsButtonsToDom();

            return new Promise((resolve, reject) => {
                resolve(`${this.itemsArray.length} items ware added to Item.itemsArray.`);
            });
        }
        catch (error) {
            console.log(`Error fetching data: ${error.message}`);
        }
    };
}

(function init() {
    // if (window.location.pathname === '/') {
        window.addEventListener('load', async (event) => { 
            await Item.getItemsData(); // Item.addItemsButtonsToDom(); is invoked inside.
            nodes.infoWrapper.style.display = 'block';
        });
        window.addEventListener('resize', async (event) => { Item.addItemsButtonsToDom(); });
    
        nodes.itemsToggleLeft.addEventListener('click', () => { Item.toggleItemsLeft(); });
        nodes.itemsToggleRight.addEventListener('click', () => { Item.toggleItemsRight(); });
    // } else {
    //     nodes.navigation.style.display = 'none';
    // }
})();
