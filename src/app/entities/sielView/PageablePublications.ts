import { PageDetails } from "./PageDetails";
import { PublicationView } from "./PublicationView";

export class PageablePublications{

    publications : Array<PublicationView> =[];

    page : PageDetails = new PageDetails;
}