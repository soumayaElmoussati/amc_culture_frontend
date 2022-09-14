import { PageDetails } from "./PageDetails";
import { PublisherRepresentedView } from "./PublisherRepresentedView";

export class PageablePublisher{
    publishers : Array<PublisherRepresentedView> =[];

    page : PageDetails = new PageDetails;
}