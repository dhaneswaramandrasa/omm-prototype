import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimulationStore } from '@/stores/simulationStore';
import { RupiahInput } from '@/components/RupiahInput';

const AMOUNT_PRESETS = [10_000_000, 25_000_000, 50_000_000, 100_000_000, 250_000_000];
const TENOR_PRESETS  = [3, 6, 12, 24, 36];

export default function SimulationStep1Page() {
  const navigate = useNavigate();
  const { amount, tenor, setAmount, setTenor } = useSimulationStore();

  const [localAmount, setLocalAmount] = useState(amount ?? 50_000_000);
  const [localTenor,  setLocalTenor]  = useState(tenor  ?? 12);

  useEffect(() => {
    if (amount) setLocalAmount(amount);
    if (tenor)  setLocalTenor(tenor);
  }, []);

  const handleNext = () => {
    setAmount(localAmount);
    setTenor(localTenor);
    navigate('/merchant/simulate/step2');
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-blue text-white flex items-center justify-center text-sm font-bold">1</div>
          <span className="text-sm font-semibold text-primary-blue">Simulasi</span>
        </div>
        <div className="flex-1 max-w-16 h-0.5 bg-gray-300" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-sm font-bold">2</div>
          <span className="text-sm text-text-secondary">Pilih Mitra</span>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-text-primary">
          Cari Modal yang <span className="text-accent-blue">Tepat</span>
        </h1>
        <p className="text-text-secondary mt-1 text-sm">
          Pilih nominal & tenor untuk melihat mitra yang tersedia
        </p>
      </div>

      {/* Amount Card */}
      <div className="bg-card rounded-2xl border border-gray-200 p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-accent-blue/10 flex items-center justify-center">
            <span className="text-accent-blue text-sm font-bold">Rp</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">Nominal Modal</p>
            <p className="text-xs text-text-secondary">Berapa yang Anda butuhkan?</p>
          </div>
        </div>
        <RupiahInput
          value={localAmount}
          onChange={setLocalAmount}
          min={1_000_000}
          max={500_000_000}
          step={1_000_000}
          presets={AMOUNT_PRESETS}
        />
      </div>

      {/* Tenor Card */}
      <div className="bg-card rounded-2xl border border-gray-200 p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
            <span className="text-gold text-sm">📅</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">Jangka Waktu</p>
            <p className="text-xs text-text-secondary">Berapa lama cicilan Anda?</p>
          </div>
        </div>

        {/* Tenor display */}
        <div className="text-3xl font-bold text-gold mb-4 tabular-nums">
          {localTenor} Bulan
        </div>

        {/* Slider */}
        <input
          type="range"
          min={3}
          max={36}
          step={3}
          value={localTenor}
          onChange={(e) => setLocalTenor(parseInt(e.target.value, 10))}
          className="w-full accent-gold"
        />
        <div className="flex justify-between text-xs text-text-secondary mt-1 mb-4">
          <span>3 Bulan</span>
          <span>36 Bulan</span>
        </div>

        {/* Tenor preset chips */}
        <div className="flex flex-wrap gap-2">
          {TENOR_PRESETS.map((t) => (
            <button
              key={t}
              onClick={() => setLocalTenor(t)}
              className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                localTenor === t
                  ? 'border-gold bg-gold text-white'
                  : 'border-gray-300 bg-white text-text-primary hover:border-gold hover:text-gold'
              }`}
            >
              {t} Bulan
            </button>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-accent-blue">
        💡 Pilihan mitra akan muncul setelah Anda melanjutkan. Setiap mitra mempertimbangkan
        profil bisnis Anda secara menyeluruh.
      </div>

      {/* CTA */}
      <button
        onClick={handleNext}
        className="w-full bg-primary-blue text-white rounded-xl py-4 font-semibold text-base hover:bg-primary-blue/90 transition-colors"
      >
        Lanjut ke Pilih Mitra →
      </button>
    </div>
  );
}
