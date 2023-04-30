export class ImageClass {
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