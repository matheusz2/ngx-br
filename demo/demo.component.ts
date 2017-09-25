import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgxBrValidators} from "../src/ngx-br-validators";

@Component({
  selector: 'br-demo-app',
  template: `
    <form class="container" [formGroup]="form">
      <div class="row">
        <div class="col-md-7 form-group">

          <div class="row">
            <div class="col-md-12 form-group">
              <h3>CPF Component</h3>
              <p>Text input with a CPF mask.</p>
            </div>
          </div>
          <div class="row example-box">
            <div class="col-md-6 form-group">
              <label>EXAMPLE</label>
              <cpf-container [control]="form.get('cpf')">
                <cpf formControlName="cpf" [(ngModel)]="model.cpf"></cpf>
              </cpf-container>
            </div>
            <div class="col-md-6">
              <label>DISABLED</label>
              <cpf formControlName="cpfDisabled" [(ngModel)]="model.cpfDisabled"></cpf>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 form-group">
              <h3>CNPJ Component</h3>
              <p>Text input with a CNPJ mask.</p>
            </div>
          </div>
          <div class="row example-box">
            <div class="col-md-6 form-group">
              <label>EXAMPLE</label>
              <cnpj-container [control]="form.get('cnpj')">
                <cnpj [(ngModel)]="model.cnpj" formControlName="cnpj"></cnpj>
              </cnpj-container>
            </div>
            <div class="col-md-6">
              <label>DISABLED</label>
              <cnpj [(ngModel)]="model.cnpjDisabled" formControlName="cnpjDisabled"></cnpj>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 form-group">
              <h3>TELEFONE Component</h3>
              <p>Text input with a Phone mask.</p>
            </div>
          </div>
          <div class="row example-box">
            <div class="col-md-6 form-group">
              <label>EXAMPLE</label>
              <telefone [(ngModel)]="model.telefone" formControlName="telefone"></telefone>
            </div>
            <div class="col-md-6">
              <label>DISABLED</label>
              <telefone [disabled]="true"></telefone>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 form-group">
              <label>UF</label>
              <estados [(ngModel)]="model.estado" [ngModelOptions]="{standalone: true}" [placeholder]="'Escolhe aí'">
              </estados>
            </div>
            <div class="col-md-4 form-group">
              <label>Cep</label>
              <cep [(ngModel)]="model.cep" formControlName="cep"></cep>
            </div>
            <div class="col-md-4 form-group">
              <label>Hora</label>
              <hora [disabled]="true" [(ngModel)]="model.hora" formControlName="hora"></hora>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <dinheiro [(ngModel)]="model.dinheiro" formControlName="dinheiro"></dinheiro>
              <span *ngIf="form.get('dinheiro').hasError('dinheiroRequired')">Required</span>
            </div>
            <div class="col-md-2">
              {{10.6 | dinheiro}}
              {{10.5 | dinheiro}}
              {{1.23 | dinheiro}}
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <percentual [(ngModel)]="model.percentual" formControlName="percentual"></percentual>
            </div>
            <div class="col-md-3">
              {{form.get('percentual').hasError('percentualRequired')}}
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <peso [(ngModel)]="model.peso" [ngModelOptions]="{standalone: true}"></peso>
            </div>
          </div>
        </div>

        <div class="col-md-5 form-group">
          <div class="affix">
            <h3>Form</h3>
            <p style="margin-bottom: 22px">All data as json value</p>
            <pre style="width: 100%">{{ form.value | json }}</pre>
          </div>
        </div>
      </div>
    </form>`,
  styles: [`
    .example-box {
      border: 1px solid lightgrey;
      padding: 15px;
      margin-bottom: 15px;
    }

    .example-box > div > label {
      color: #b3b3b3;
    }
  `]
})
export class DemoComponent {

  public form: FormGroup;
  public model = new DemoModel();

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
    this.updateValues();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      cpf: [null, NgxBrValidators.cpf()],
      cnpj: [null, NgxBrValidators.cnpj()],
      cpfDisabled: [null],
      cnpjDisabled: [null],
      telefone: [null],
      cep: [null],
      percentual: [null, NgxBrValidators.percentualRequired()],
      estado: [null],
      dinheiro: [null, NgxBrValidators.dinheiroRequired()],
      hora: [null, NgxBrValidators.hora()]
    });
  }

  private updateValues() {
    this.form.get('cpfDisabled').setValue(12345678900);
    this.form.get('cpfDisabled').disable();
    this.form.get('cnpjDisabled').setValue(12345678900);
    this.form.get('cnpjDisabled').disable();

    setTimeout(() => {
      this.form.get('cpf').setValue("08754248990");
      this.model.estado = "SC";
      this.model.hora = "22:22";
      this.model.cep = "88715000";
      this.model.telefone = 48999999999;
      this.model.cnpj = 98798798;
      this.model.dinheiro = 150.78;
      this.model.percentual = 15.9;
      this.model.peso = 30.69;
    }, 1000);

    setTimeout(() => {
      this.model.dinheiro = 0;
      this.model.percentual = 0;
      this.model.peso = 0;
    }, 4000);
  }
}

class DemoModel {
  cpf: number;
  cpfDisabled: number;
  cnpj: number;
  cnpjDisabled: number;
  estado: string;
  hora: string;
  cep: string;
  telefone: number;
  dinheiro: number;
  percentual: number;
  peso: number;
}
