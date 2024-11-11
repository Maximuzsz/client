import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { Caixa } from '@/types/caixa';
import { useEffect, useState } from 'react';

interface CaixaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (caixaData: Caixa) => void;
  caixa?: Caixa | null;
}

export default function CaixaModal({ isOpen, onClose, onSave, caixa }: CaixaModalProps) {
  const [caixa_id, setCaixa_id] = useState('');
  const [valorCartaoMaquina1, setMaquina1] = useState(0);
  const [valorCartaoMaquina2, setMaquina2] = useState(0);
  const [valorDinheiro, setDinheiro] = useState(0);
  const [valorPix, setPix] = useState(0);
  const [valorentrada, setEntrada] = useState(0);
  const [valorFinal, setFinal] = useState(0);
  const [saida, setSaida] = useState(0);
  const [totalDiario, setTotalDiario] = useState(0);

  useEffect(() => {
    if (caixa) {
      setCaixa_id(caixa.caixa_id || '');
      setMaquina1(caixa.valorCartaoMaquina1 || 0);
      setMaquina2(caixa.valorCartaoMaquina2 || 0);
      setDinheiro(caixa.valorDinheiro || 0);
      setPix(caixa.valorPix || 0);
      setEntrada(caixa.valorentrada || 0);
      setFinal(caixa.valorFinal || 0);
      setSaida(caixa.saida || 0);
      setTotalDiario(caixa.totalDiario || 0);
    } else {
        setCaixa_id('');
        setMaquina1(0);
        setMaquina2(0);
        setDinheiro(0);
        setPix(0);
        setEntrada(0);
        setFinal(0);
        setSaida(0);
        setTotalDiario(0);
    }
  }, [caixa]);

  const handleSave = () => {
    const caixaData: Caixa = { caixa_id, valorCartaoMaquina1, valorCartaoMaquina2, valorDinheiro, valorPix,valorentrada,valorFinal,saida, totalDiario};
    onSave(caixaData);
    onClose(); // Fecha a modal após salvar
  };

  const handleFechar = () => {
    setTotalDiario(valorCartaoMaquina1+valorCartaoMaquina2+ valorDinheiro+ valorPix+ valorentrada+ valorFinal - saida);
    const caixaData: Caixa = { caixa_id, valorCartaoMaquina1, valorCartaoMaquina2, valorDinheiro, valorPix,valorentrada,valorFinal,saida, totalDiario, fechado:true};
    onSave(caixaData);
    onClose(); // Fecha a modal após salvar
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-center">
              {caixa ? 'Editar Cliente' : 'Cadastrar Cliente'}
            </h2>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
                <div>
                    <Label htmlFor="valorentrada">Total Entrada</Label>
                    <Input
                    id="valorentrada"
                    type="number"
                    disabled={caixa?.valorentrada? true: false }
                    value={valorentrada}
                    onChange={(e) => setEntrada(e.target.valueAsNumber)}
                    placeholder="0,00"
                    className="w-full"
                    required
                    />
                <div>
                <Label htmlFor="valorCartaoMaquina1">Maquina Geo</Label>
                <Input
                  id="valorCartaoMaquina1"
                  type="number"
                  disabled={caixa?.totalDiario? true: false }
                  value={valorCartaoMaquina1}
                  onChange={(e) => setMaquina1(e.target.valueAsNumber)}
                  placeholder="0,00"
                  className="w-full"
                />
                </div>
                <div>
                    <Label htmlFor="valorCartaoMaquina2">Maquina Leão</Label>
                    <Input
                    id="valorCartaoMaquina2"
                    type="number"
                    disabled={caixa?.totalDiario? true: false }
                    value={valorCartaoMaquina1}
                    onChange={(e) => setMaquina1(e.target.valueAsNumber)}
                    placeholder="0,00"
                    className="w-full"
                    />
                </div>
                <div>
                    <Label htmlFor="valorDinheiro">Total Dinheiro</Label>
                    <Input
                    id="valorDinheiro"
                    type="number"
                    disabled={caixa?.totalDiario? true: false }
                    value={valorDinheiro}
                    onChange={(e) => setDinheiro(e.target.valueAsNumber)}
                    placeholder="0,00"
                    className="w-full"
                    required
                    />
                </div>
                <div>
                    <Label htmlFor="valorPix">Total Pix</Label>
                    <Input
                    id="valorPix"
                    type="number"
                    disabled={caixa?.totalDiario? true: false }
                    value={valorPix}
                    onChange={(e) => setPix(e.target.valueAsNumber)}
                    placeholder="0,00"
                    className="w-full"
                    />
                </div>
                <div>
                    <Label htmlFor="valorFinal">Troco Final</Label>
                    <Input
                    id="valorFinal"
                    type="number"
                    disabled={caixa?.totalDiario? true: false }
                    value={valorFinal}
                    onChange={(e) => setFinal(e.target.valueAsNumber)}
                    placeholder="0,00"
                    className="w-full"
                    />
                </div>
                <div>
                    <Label htmlFor="saida">Total Saida</Label>
                    <Input
                    id="saida"
                    type="number"
                    disabled={caixa?.totalDiario? true: false }
                    value={saida}
                    onChange={(e) => setSaida(e.target.valueAsNumber)}
                    placeholder="0,00"
                    className="w-full"
                    />
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSave} disabled={caixa?.fechado}>
                  {caixa ? 'Salvar Alterações' : 'Abrir Caixa'}
                </Button>
                <Button onClick={handleFechar}  disabled={caixa?.fechado  }>
                  Fechar Caixa
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Modal>
  );
}
