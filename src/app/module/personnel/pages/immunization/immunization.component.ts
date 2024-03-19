import { Component } from '@angular/core';
import { AtRiskPreschoolService } from '../../shared/services/atRiskPreschool.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-immunization',
  templateUrl: './immunization.component.html',
  styleUrl: './immunization.component.scss',
})
export class ImmunizationComponent {
  selectdata: any;
  cols: any;
  data: any;
  createModal: boolean = false;

  constructor(
    private _preschoolAtRiskService: AtRiskPreschoolService,
    public toast: HotToastService
  ) {
    this.getAllPrechoolWithRisk();
  }

  getAllPrechoolWithRisk() {
    this._preschoolAtRiskService.getAllCreatedPreschoolAtRisk().subscribe({
      next: (res: any) => {
        this.data = res?.data;
      },
    });
  }

  deleteData(riskId: any) {
    const confirmation = confirm(
      'Are you sure, you want to delete this record?'
    );
    if (!confirmation) return;
    this._preschoolAtRiskService.deletePreschoolAtRiskRecord(riskId).subscribe({
      next: (res: any) => {
        this.toast.success(res?.message || 'Successfully Deleted');
        this.getAllPrechoolWithRisk();
      },
      error: (err: any) => {
        this.toast.warning(err?.error?.messaeg || 'An error occurred');
      },
    });
  }

  registerFamiltyProfileCommit() {
    this.getAllPrechoolWithRisk();
    this.createModal = false;
  }
}
