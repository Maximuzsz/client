export interface Caixa {
    caixa_id?: string;
    valorCartaoMaquina1?: number;
    valorCartaoMaquina2?:number;
    valorDinheiro?:number;
    valorPix?:number;
    valorentrada?:number;//valor iniciado no dio
    valorFinal?:number; //valor Fim do dia
    saida?:number;
    totalDiario?:number;
    dataLancamento?: string;
    empresa_id?:string;
    usuario_id?:string;
    fechado?: boolean;
}