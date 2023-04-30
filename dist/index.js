class ImageGallery {
    constructor(images, imgPerPage = 5) {
        this.imagesInList = [];
        this.currentPage = 0;
        this.pagers = [];
        this.currentImgIndex = 0;
        this.images = images;
        this.mainImage = document.getElementById("mainImage");
        this.imgPerPage = imgPerPage;
    }
    initPagers() {
        let pagerList = document.getElementById("pagerList");
        for (let index = 0; index < this.images.length / this.imgPerPage; index++) {
            const outerDiv = document.createElement("div");
            const innerDiv = document.createElement("div");
            outerDiv.classList.add("pagerOuter");
            innerDiv.classList.add("pagerInner");
            this.pagers.push(innerDiv);
            pagerList === null || pagerList === void 0 ? void 0 : pagerList.appendChild(outerDiv);
            outerDiv === null || outerDiv === void 0 ? void 0 : outerDiv.appendChild(innerDiv);
            outerDiv.addEventListener('click', () => {
                this.currentPage = index;
                this.setImgList(index);
                this.setPagers(index);
            });
        }
        this.pagers[0].classList.add("bg-green-500");
    }
    initArrows() {
        let leftArrow = document.getElementById("leftArrow");
        let rightArrow = document.getElementById("rightArrow");
        leftArrow === null || leftArrow === void 0 ? void 0 : leftArrow.addEventListener('click', (event) => {
            this.goDirection(-1);
            event.stopPropagation();
        });
        rightArrow === null || rightArrow === void 0 ? void 0 : rightArrow.addEventListener('click', (event) => {
            this.goDirection(1);
            event.stopPropagation();
        });
    }
    goDirection(direction) {
        let addToIndex = 0;
        if (this.currentImgIndex == 0) {
            if (direction != 0)
                addToIndex = direction == -1 ? this.imagesInList.length - 1 : 1;
        }
        else if (this.currentImgIndex == this.imagesInList.length - 1) {
            if (direction != 0)
                addToIndex = direction == -1 ? -1 : -(this.imagesInList.length - 1);
        }
        else {
            addToIndex = direction;
        }
        this.currentImgIndex += addToIndex;
        this.displayAsMain(this.imagesInList[this.currentImgIndex].src);
        this.highLightImageInList(this.imagesInList[this.currentImgIndex]);
        this.setPagers(Math.floor(this.currentImgIndex / this.imgPerPage));
        this.setImgList(Math.floor(this.currentImgIndex / this.imgPerPage));
    }
    setPagers(page) {
        this.pagers.forEach((pager, index) => {
            if (index == page) {
                pager.classList.add("bg-green-500");
            }
            else {
                pager.classList.remove("bg-green-500");
            }
        });
    }
    setImgList(page) {
        this.imagesInList.forEach((img, index) => {
            var _a, _b;
            if (index >= page * this.imgPerPage && index < page * this.imgPerPage + this.imgPerPage) {
                (_a = img.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
            }
            else {
                (_b = img.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add("hidden");
            }
        });
    }
    initMainImg() {
        if (this.mainImage) {
            this.images[0].createImgElement(this.mainImage, this.images[0].fileName, 0, this.imgPerPage);
        }
    }
    initImgList() {
        const imageList = document.getElementById("imageList");
        if (imageList) {
            this.images.forEach((image, index) => {
                let imgPictureElement = image.createImgElement(imageList, image.fileName, index, this.imgPerPage);
                imgPictureElement.classList.add("listImg", "opacity-70");
                let img = imgPictureElement.getElementsByTagName('img')[0];
                this.imagesInList.push(img);
                img.addEventListener('click', () => {
                    this.currentImgIndex = index;
                    this.displayAsMain(img.src);
                    this.highLightImageInList(img);
                });
            });
            this.highLightImageInList(this.imagesInList[0]);
        }
    }
    displayAsMain(imgSrc) {
        if (this.mainImage) {
            this.mainImage.getElementsByTagName("source")[0].srcset = imgSrc;
            this.mainImage.getElementsByTagName("img")[0].src = imgSrc;
        }
    }
    highLightImageInList(img) {
        var _a;
        this.imagesInList.forEach(image => {
            var _a;
            (_a = image.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add("opacity-70");
        });
        (_a = img.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove("opacity-70");
    }
    clearPagers() {
        this.pagers.forEach(pager => {
            var _a;
            (_a = pager.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
        });
        this.pagers = [];
    }
    setListItemCount() {
        if (window.innerWidth < 590) {
            this.redrawPagers(1);
        }
        else if (window.innerWidth < 865) {
            this.redrawPagers(2);
        }
        else if (window.innerWidth < 1155) {
            this.redrawPagers(3);
        }
        else if (window.innerWidth < 1355) {
            this.redrawPagers(4);
        }
        else {
            this.redrawPagers(5);
        }
    }
    redrawPagers(pagerCount) {
        if (this.imgPerPage != pagerCount) {
            this.imgPerPage = pagerCount;
            this.clearPagers();
            this.initPagers();
            this.goDirection(0);
        }
    }
}
import { ImageClass } from "./image.js";
document.addEventListener("DOMContentLoaded", () => {
    let imageGallery = new ImageGallery([
        new ImageClass("cat1.jpg"),
        new ImageClass("cat2.jpg"),
        new ImageClass("cat3.jpg"),
        new ImageClass("cat4.jpg"),
        new ImageClass("cat5.jpg"),
        new ImageClass("cat6.jpg"),
        new ImageClass("cat7.jpg"),
        new ImageClass("cat8.jpg"),
        new ImageClass("cat9.jpg"),
        new ImageClass("cat10.jpg"),
        new ImageClass("cat11.jpg")
    ]);
    imageGallery.initPagers();
    imageGallery.initArrows();
    imageGallery.initMainImg();
    imageGallery.initImgList();
    window.addEventListener('resize', () => {
        imageGallery.setListItemCount();
    });
});
