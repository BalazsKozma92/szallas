class ImageGallery {

    images: ImageClass[]

    mainImage: HTMLElement | null
    imagesInList: HTMLImageElement[] = []

    currentPage: number = 0
    imgPerPage: number
    pagers: HTMLElement[] = []

    currentImgIndex: number = 0

    constructor(images: ImageClass[], imgPerPage: number = 5) {
        this.images = images
        this.mainImage = document.getElementById("mainImage");
        this.imgPerPage = imgPerPage
    }

    public initPagers() {
        let pagerList = document.getElementById("pagerList")

        for (let index = 0; index < this.images.length / this.imgPerPage; index++) {
            const outerDiv = document.createElement("div");
            const innerDiv = document.createElement("div");

            outerDiv.classList.add("pagerOuter")
            innerDiv.classList.add("pagerInner")

            this.pagers.push(innerDiv)

            pagerList?.appendChild(outerDiv);
            outerDiv?.appendChild(innerDiv);

            outerDiv.addEventListener('click', () => {
                this.currentPage = index
                this.setImgList(index)
                this.setPagers(index)
            })
        }

        this.pagers[0].classList.add("bg-green-500")
    }

    public initArrows() {
        let leftArrow = document.getElementById("leftArrow")
        let rightArrow = document.getElementById("rightArrow")

        leftArrow?.addEventListener('click', (event) => {
            this.goDirection(-1)
            event.stopPropagation()
        })
        rightArrow?.addEventListener('click', (event) => {
            this.goDirection(1)
            event.stopPropagation()
        })
    }

    private goDirection(direction: -1 | 0 | 1) {
        if (this.currentImgIndex == 0) {
            if (direction != 0)
                direction = direction == -1 ? 0 : 1
        } else if (this.currentImgIndex == this.imagesInList.length - 1) {
            if (direction != 0)
                direction = direction == -1 ? -1 : 0
        }

        this.currentImgIndex += direction

        this.displayAsMain(this.imagesInList[this.currentImgIndex].src)
        this.highLightImageInList(this.imagesInList[this.currentImgIndex])
        this.setPagers(Math.floor(this.currentImgIndex / this.imgPerPage))
        this.setImgList(Math.floor(this.currentImgIndex / this.imgPerPage))
    }

    private setPagers(page: number) {
        this.pagers.forEach((pager, index) => {
            if (index == page) {
                pager.classList.add("bg-green-500")
            } else {
                pager.classList.remove("bg-green-500")
            }
        });
    }

    private setImgList(page: number): void {
        this.imagesInList.forEach((img, index) => {
            if (index >= page * this.imgPerPage && index < page * this.imgPerPage + this.imgPerPage) {
                img.parentElement?.classList.remove("hidden")
            } else {
                img.parentElement?.classList.add("hidden")
            }
        });
    }

    public initMainImg(): void {
        if (this.mainImage) {
            this.images[0].createImgElement(this.mainImage, this.images[0].fileName, 0, this.imgPerPage)
        }
    }

    public initImgList(): void {
        const imageList = document.getElementById("imageList");

        if (imageList) {
            this.images.forEach((image, index) => {
                let imgPictureElement = image.createImgElement(imageList, image.fileName, index, this.imgPerPage)
                imgPictureElement.classList.add("listImg", "opacity-70")

                let img = imgPictureElement.getElementsByTagName('img')[0]

                this.imagesInList.push(img)
                img.addEventListener('click', () => {
                    this.currentImgIndex = index
                    this.displayAsMain(img.src)
                    this.highLightImageInList(img)
                })
            })

            this.highLightImageInList(this.imagesInList[0])
        }
    }

    private displayAsMain(imgSrc: string) {
        if (this.mainImage) {
            this.mainImage.getElementsByTagName("source")[0].srcset = imgSrc
            this.mainImage.getElementsByTagName("img")[0].src = imgSrc
        }
    }

    private highLightImageInList(img: HTMLElement) {
        this.imagesInList.forEach(image => {
            image.parentElement?.classList.add("opacity-70")
        })
        img.parentElement?.classList.remove("opacity-70")
    }

    private clearPagers() {
        this.pagers.forEach(pager => {
            pager.parentElement?.remove()
        });

        this.pagers = []
    }

    public setListItemCount() {
        if (window.innerWidth < 590) {
            this.redrawPagers(1)
        } else if (window.innerWidth < 865) {
            this.redrawPagers(2)
        } else if (window.innerWidth < 1155) {
            this.redrawPagers(3)
        } else if (window.innerWidth < 1355) {
            this.redrawPagers(4)
        } else {
            this.redrawPagers(5)
        }
    }

    private redrawPagers(pagerCount: number) {
        if (this.imgPerPage != pagerCount) {
            this.imgPerPage = pagerCount
            this.clearPagers()
            this.initPagers()
            this.goDirection(0)
        }
    }
}

class ImageClass {
    fileName: string
    title: string | null
    description: string | null
    date: Date | null

    constructor(fileName: string, title: string | null = null, description: string | null = null, date: Date | null = null) {
        this.fileName = fileName
        this.title = title
        this.description = description
        this.date = date
    }

    public createImgElement(elementToAppend: HTMLElement, imageName: string, index: number, imgPerPage: number): HTMLElement {
        const pic = document.createElement("picture");

        if (index >= imgPerPage) {
            pic.classList.add("hidden")
        }

        if (elementToAppend) {
            const source = document.createElement("source");
            source.srcset = `./src/img/gallery/${imageName}`;
            source.type = "image/webp"

            const img = document.createElement("img");
            img.src = `./src/img/gallery/${imageName}`;

            pic?.appendChild(source);
            pic?.appendChild(img);

            elementToAppend?.appendChild(pic)
        }

        return pic;
    }
}

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
    imageGallery.initPagers()
    imageGallery.initArrows()
    imageGallery.initMainImg()
    imageGallery.initImgList()

    window.addEventListener('resize', () => {
        imageGallery.setListItemCount();
    });

}); 
