import { EditionView } from "./EditionView";
import { ExhibitorView } from "./ExhibitorView";
import { PageDetails } from "./PageDetails";

export class EditionDetail{

    edition:EditionView = new EditionView();

    exhibitor:Array<ExhibitorView>=[];

    page:PageDetails = new PageDetails();

    isCollapsed :boolean=false;
}