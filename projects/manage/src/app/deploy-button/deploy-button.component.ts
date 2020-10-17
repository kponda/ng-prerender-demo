import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-deploy-button',
  templateUrl: './deploy-button.component.html',
  styleUrls: ['./deploy-button.component.scss']
})
export class DeployButtonComponent implements OnInit {
  inProgress = false;

  constructor(private functions: AngularFireFunctions) { }

  ngOnInit(): void {
  }

  async deploy() {
    if (this.inProgress) {
      return;
    }
    this.inProgress = true;
    try {
      const result = await this.functions.httpsCallable('CallCloudBuild')({}).toPromise();
      console.log(result);
    } catch(e) {
      console.log(e);
    } finally {
      this.inProgress = false;
    }
  }
}
