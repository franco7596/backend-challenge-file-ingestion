import { ClientRecordDTO } from "../dto/clientRecord.dto";

export class Client {
  fullName: string;
  dni: number;
  status: string;
  entryDate: Date;
  isPEP: boolean;
  isSubjectToObligation?: boolean;
  creationDate: Date;

  constructor(dto: ClientRecordDTO) {
    this.fullName = dto.fullName;
    this.dni = dto.dni;
    this.status = dto.status;
    this.entryDate = dto.entryDate;
    this.isPEP = dto.isPEP;
    this.isSubjectToObligation = dto.isSubjectToObligation;
    this.creationDate = dto.creationDate;
  }

  toRow(): any[] {
    return [
      this.fullName,
      this.dni,
      this.status,
      this.entryDate,
      this.isPEP,
      this.isSubjectToObligation,
      this.creationDate,
    ];
  }
}