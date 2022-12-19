import {View} from "nd_frontend/framework/core/View.mjs";
import {Default} from "nd_frontend/framework/generics/frontend/templates/Default.mjs";
import {Header} from "nd_frontend/framework/generics/frontend/atoms/Header.mjs";
import {Paragraph} from "nd_frontend/framework/generics/frontend/atoms/Paragraph.mjs";

export function Home(){

    View.call(this)

    this.title = "Home"

    const header = new Header(1,"Home")
    const paragraph = new Paragraph("This is the home page.")

    this.template = new Default()
    this.template.components.push(header, paragraph)
}
