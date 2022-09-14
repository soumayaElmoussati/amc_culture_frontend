import { Component, OnInit } from '@angular/core';
import {STAND_TYPES} from "../../../../lists/StandTypes";
import {SUPERFICIES} from "../../../../lists/superficies";
import {MODES_PAIEMENT} from "../../../../lists/modePaiement";
import { ActivatedRoute } from '@angular/router';
import {SielService} from "../../../../services/siel/exposant/siel.service";

import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-generer-qr-code-exposant',
  templateUrl: './generer-qr-code-exposant.component.html',
  styleUrls: ['./generer-qr-code-exposant.component.scss']
})
export class GenererQrCodeComponent implements OnInit {


  showQrCode = false;
  showQrCodeLoader = false;
  showGenerateLoader = false;

  qrInfo = "";

  nomUser = "";


  constructor(private route:ActivatedRoute, private sielService: SielService) {

   }

  ngOnInit(): void {
    this.showQrCodeLoader = true;
    this.sielService.getInfoDemandePublication("EXHB_AMC_000000001").subscribe((response)=>{
      console.log(response);
      this.qrInfo = `Nom : ${response["responsibleManagerName"]}\nPays : ${response["country"]}`;
      this.nomUser = response["responsibleManagerName"];
      this.showQrCodeLoader = false;
      this.showQrCode = true;
    }, (error)=>{
      console.log(error);
      this.showQrCodeLoader = false;
    });
  }

  toPdf() {
    this.showGenerateLoader = true;
    const badgeContainer = document.getElementById('badgeContainer');

    const badgeHeight = 355;
    const badgeWidth = 1480;

    const options = { background: 'white', width: badgeWidth, height: badgeHeight };

    domtoimage.toPng(badgeContainer, options).then((imgData) => {
        var link = document.createElement('a');
        link.download = 'badge.png';
        link.href = imgData;
        link.click();

        const doc = new jsPDF(badgeWidth > badgeHeight ? 'l' : 'p', 'mm', [badgeWidth, badgeHeight]);
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        doc.save('badge.pdf');
        this.showGenerateLoader = false;
    });
}

}
