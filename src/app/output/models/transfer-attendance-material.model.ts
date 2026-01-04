import TransferAttendanceMaterialItem from './transfer-attendance-material-item.model';

class TransferAttendanceMaterial{
    stm_Id: number;
    stmDtCriacao: string;
    stmDtAprovacao: string;
    stmDtAtualizacao: string;
    stsId: number;
    stsDescricao: string;
    usuIdCriacao: number;
    usuNomeCriacao: string;
    usuIdAprovador: number;
    usuNomeAprovador: string;
    usuIdSolicitante: number;
    usuNomeSolicitante: string;
    insIdOrigem: number;
    insNomeOrigem: string;
    instIdDestino: number;
    insNomeDestino: string;
    materials: TransferAttendanceMaterialItem[];

}

export default TransferAttendanceMaterial;
