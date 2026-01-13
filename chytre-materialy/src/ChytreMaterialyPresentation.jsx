import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Package, AlertTriangle, CheckCircle, TrendingUp, Layers, Search, Filter, ArrowRight, Building2, Droplets, Hammer, Gem, Paintbrush, Wrench, Home, Sparkles, Box } from 'lucide-react';

const categories = [
  { id: 1, name: "Lepidla na obklady a dlažby", skus: 65, percent: 9, icon: Layers, color: "#3B82F6",
    subcategories: ["Standardní C1T", "Flexibilní C2TE", "Vysoce flexibilní S1/S2", "Rychletuhnoucí", "Disperzní a speciální"],
    brands: ["MAPEI Keraflex", "Schönox Q-series", "Schomburg Monoflex"],
    research: "100% priority: Movement tolerance | 99% desire: Tile/substrate matching"
  },
  { id: 2, name: "Spárovací hmoty", skus: 180, percent: 24, icon: Paintbrush, color: "#8B5CF6", highlight: true,
    subcategories: ["Cementové flexibilní (Ultracolor Plus 50+ barev)", "Epoxidové (Kerapoxy Easy Design 45+ barev)", "Cementové standardní"],
    brands: ["MAPEI Ultracolor Plus", "MAPEI Kerapoxy Easy Design", "Schönox WD Flex"],
    research: "80% priority: Stain-free aesthetics | 76% desire: Color matching"
  },
  { id: 3, name: "Sanitární silikony", skus: 75, percent: 10, icon: Droplets, color: "#06B6D4",
    subcategories: ["Standardní barevné (Mapesil AC 45+ barev)", "S nízkým modulem", "Matné povrchy"],
    brands: ["MAPEI Mapesil AC", "Schönox ES"],
    research: "90% priority: Moisture-resistant assemblies | 70% desire: Mold resistance"
  },
  { id: 4, name: "Pružné tmely", skus: 35, percent: 5, icon: Box, color: "#F59E0B",
    subcategories: ["Polyuretanové", "MS polymerové", "Akrylové"],
    brands: ["Sika Sikaflex", "MAPEI Mapeflex"],
    research: "100% priority: Movement tolerance | 80% desire: Structural flexibility"
  },
  { id: 5, name: "Hydroizolace", skus: 90, percent: 12, icon: Droplets, color: "#10B981",
    subcategories: ["Interiérové stěrkové", "Exteriérové 2K", "Rychlé/speciální", "Těsnící pásky a manžety", "Bitumenové"],
    brands: ["MAPEI Mapelastic", "Schönox 1K/2K-DS", "Schomburg Aquafin"],
    research: "90% priority: Waterproof assemblies | 97% desire: Prevent water damage"
  },
  { id: 6, name: "Příprava podkladu", skus: 100, percent: 13, icon: Hammer, color: "#EF4444",
    subcategories: ["Penetrace", "Adhezní můstky", "Samonivelační stěrky", "Opravné malty", "Rychlovazné cementy"],
    brands: ["MAPEI Primer/Ultraplan", "Schönox SP/DE", "Sika MonoTop"],
    research: "90% priority: Predictable performance | 80% desire: Fast repairs"
  },
  { id: 7, name: "Průmyslové podlahy a nátěry", skus: 35, percent: 5, icon: Building2, color: "#F97316", isNew: true,
    subcategories: ["Epoxidové systémy", "Polyuretanové systémy", "Dekorativní stěrky", "Garážové systémy"],
    brands: ["Sika Sikafloor", "MAPEI Mapecoat", "Botament Beton Optik"],
    research: "95% desire: High-strength for heavy traffic | Was COMPLETELY MISSING!"
  },
  { id: 8, name: "Přírodní kámen", skus: 55, percent: 7, icon: Gem, color: "#EC4899",
    subcategories: ["Impregnace", "Zvýrazňovače barev", "Lepidla na kámen", "Čističe kamene", "Leštící pasty"],
    brands: ["Bellinzoni", "Tenax", "Sopro"],
    research: "70% priority: Protect from staining | Dedicated specialist niche"
  },
  { id: 9, name: "Lepidla na podlahoviny", skus: 12, percent: 2, icon: Home, color: "#6366F1", rightSized: true,
    subcategories: ["Na vinyl a LVT", "Na parkety"],
    brands: ["MAPEI Ultrabond", "Schönox Durocoll", "Sika SikaBond"],
    research: "Right-sized from 3→2 subcategories based on actual inventory"
  },
  { id: 10, name: "Čističe a údržba", skus: 25, percent: 3, icon: Sparkles, color: "#14B8A6",
    subcategories: ["Na spáry", "Na dlažbu", "Na dřevo"],
    brands: ["MAPEI UltraCare", "Bellinzoni", "Synteko"],
    research: "60% priority: Easy post-installation cleaning"
  },
  { id: 11, name: "Doplňky a příslušenství", skus: 30, percent: 4, icon: Wrench, color: "#64748B",
    subcategories: ["Armovací tkaniny", "Kročejový útlum", "Dekorativní přísady", "Křemičité písky"],
    brands: ["Perlinka", "MAPEI Mapenet", "Schönox"],
    research: "Supporting products for complete installation systems"
  }
];

const structuralGaps = [
  { title: "Industrial Floor Coatings Invisible", description: "Sikafloor and Mapecoat (35 SKUs, 5%) had no category", solution: "New 'Průmyslové podlahy' category created" },
  { title: "Grouts Poorly Organized", description: "180 SKUs (24%) mixed by brand, cement/epoxy combined", solution: "Chemistry-based subcategories" },
  { title: "Silicones Mixed with Sealants", description: "75 silicone SKUs combined with PU/MS sealants", solution: "Separated into own category (#3)" },
  { title: "Natural Stone Niche Scattered", description: "Bellinzoni + Tenax (55 SKUs) had no unified presence", solution: "Dedicated 'Přírodní kámen' category (#8)" },
  { title: "Flexibility Classes Not Visible", description: "S1/S2 adhesives buried in product specs", solution: "Subcategories by flexibility class" },
  { title: "Hardware Mixed with Chemicals", description: "75 profile/hardware SKUs (10%) don't belong here", solution: "Identified for relocation" }
];

const productGaps = [
  { title: "Underfloor Heating Products", priority: "critical", description: "UFH compatibility mentioned but no dedicated line", action: "Badge existing UFH-compatible products" },
  { title: "DIY-Friendly Small Packaging", priority: "critical", description: "Primarily professional bulk sizes (5-25kg)", action: "Negotiate 1-3kg retail packs" },
  { title: "Low-VOC / Eco-Labeled Range", priority: "critical", description: "Limited visibility of eco-labeled products", action: "Badge existing Eco products" },
  { title: "Complete System Bundles", priority: "important", description: "All components sold separately", action: "Create renovation kits" },
  { title: "Digital Application Guides", priority: "important", description: "Technical datasheets only", action: "Develop video tutorials" }
];

export default function ChytreMaterialyPresentation() {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedGap, setExpandedGap] = useState(null);

  const sections = [
    { id: 'overview', label: 'Přehled' },
    { id: 'current', label: 'Současný stav' },
    { id: 'structure', label: 'Nová struktura' },
    { id: 'gaps', label: 'Gap analýza' },
    { id: 'impact', label: 'Business Impact' }
  ];

  const totalSKUs = categories.reduce((sum, cat) => sum + cat.skus, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-200 font-sans">
      {/* Header */}
      <header className="px-6 py-4 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <div className="text-[10px] tracking-widest text-slate-500 font-mono mb-1">OUTFINDO × CHYTRÉ MATERIÁLY</div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Category Tree Reorganization
            </h1>
          </div>
          <div className="flex gap-3">
            <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <span className="font-mono text-lg font-bold text-blue-400">{totalSKUs}</span>
              <span className="text-xs text-slate-500 ml-2">SKUs</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <span className="font-mono text-lg font-bold text-emerald-400">11</span>
              <span className="text-xs text-slate-500 ml-2">categories</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="px-6 py-3 border-b border-slate-700/30 bg-slate-900/50 sticky top-[73px] z-40">
        <div className="flex gap-2 max-w-6xl mx-auto overflow-x-auto">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/40 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6 max-w-6xl mx-auto">

        {/* Overview */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Přehled projektu</h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Komplexní analýza a reorganizace kategorizace produktů stavební chemie na základě výzkumu zákaznických cílů a validace skutečného inventáře.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '742', label: 'SKUs analyzováno', color: 'blue' },
                { value: '25', label: 'zákaznických cílů', color: 'purple' },
                { value: '11', label: 'nových kategorií', color: 'emerald' }
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
                  <div className={`font-mono text-4xl font-bold text-${stat.color}-400`}>{stat.value}</div>
                  <div className="text-slate-500 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30">
              <div className="text-[10px] tracking-widest text-slate-500 font-mono mb-2">KLÍČOVÝ ZÁVĚR</div>
              <h3 className="text-xl font-semibold mb-3">Reorganizace řeší strukturální problémy bez nutnosti nových produktů</h3>
              <p className="text-slate-400">
                Lepší organizace stávajících 742 produktů přinese okamžité zlepšení zákaznické zkušenosti.
              </p>
            </div>
          </div>
        )}

        {/* Current State */}
        {activeSection === 'current' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Současný stav</h2>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-[10px] tracking-widest text-slate-500 font-mono">PROBLÉMY</div>
                {[
                  { issue: "Průmyslové podlahy neviditelné", detail: "35 SKUs bez kategorie" },
                  { issue: "Spárovací hmoty špatně organizované", detail: "180 SKUs dle značky" },
                  { issue: "Silikony smíchané s tmely", detail: "75 SKUs v jedné kategorii" },
                  { issue: "Přírodní kámen rozptýlen", detail: "55 SKUs rozházeno" },
                  { issue: "Třídy flexibility neviditelné", detail: "S1/S2 skryté v popisech" }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <div className="font-medium text-red-300">{item.issue}</div>
                    <div className="text-sm text-slate-500">{item.detail}</div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-2xl">
                <div className="text-[10px] tracking-widest text-slate-500 font-mono mb-4">NAVIGACE</div>
                <div className="mb-6">
                  <div className="text-xs text-red-400 font-semibold mb-2">❌ SOUČASNÁ</div>
                  <div className="font-mono text-xs text-slate-500">
                    Stavební chemie → Spárovací hmoty → Brand X → Produkt
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-400 font-semibold mb-2">✅ NOVÁ</div>
                  <div className="font-mono text-xs text-slate-300">
                    Stavební chemie → Spárovací hmoty → Epoxidové → Produkt
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Structure */}
        {activeSection === 'structure' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Nová struktura kategorií</h2>
            <p className="text-slate-400">11 kategorií validovaných proti inventáři a zákaznickému výzkumu</p>

            <div className="space-y-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.id}
                    onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      cat.highlight ? 'bg-purple-500/10 border-purple-500/30' :
                      cat.isNew ? 'bg-orange-500/10 border-orange-500/30' :
                      'bg-slate-800/30 border-slate-700/50 hover:border-slate-600'
                    }`}
                    style={{ borderLeftWidth: 4, borderLeftColor: cat.color }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${cat.color}20` }}>
                          <Icon size={20} color={cat.color} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{cat.id}. {cat.name}</span>
                            {cat.highlight && <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">⭐ Největší</span>}
                            {cat.isNew && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300">🆕 Nová</span>}
                            {cat.rightSized && <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">✓ Optim.</span>}
                          </div>
                          <div className="text-sm text-slate-500">{cat.skus} SKUs • {cat.percent}%</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${cat.percent * 4}%`, background: cat.color }} />
                        </div>
                        {expandedCategory === cat.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </div>
                    </div>

                    {expandedCategory === cat.id && (
                      <div className="mt-4 pt-4 border-t border-slate-700/50 grid grid-cols-2 gap-6">
                        <div>
                          <div className="text-[10px] tracking-widest text-slate-500 font-mono mb-2">PODKATEGORIE</div>
                          {cat.subcategories.map((sub, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-slate-400 mb-1">
                              <ArrowRight size={12} color={cat.color} /> {sub}
                            </div>
                          ))}
                        </div>
                        <div>
                          <div className="text-[10px] tracking-widest text-slate-500 font-mono mb-2">ZNAČKY & VÝZKUM</div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {cat.brands.map((b, i) => (
                              <span key={i} className="text-xs px-2 py-1 bg-slate-700/50 rounded">{b}</span>
                            ))}
                          </div>
                          <p className="text-xs text-slate-500">{cat.research}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-slate-700/30 border border-slate-600/50 rounded-xl">
              <div className="flex items-center gap-2 text-slate-400">
                <ArrowRight size={16} />
                <span className="font-medium">K přesunu: Profily a lišty</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-600">75 SKUs • 10%</span>
              </div>
              <p className="text-sm text-slate-500 mt-2 ml-6">Hardware → "Stavební nářadí"</p>
            </div>
          </div>
        )}

        {/* Gap Analysis */}
        {activeSection === 'gaps' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Gap analýza</h2>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={20} className="text-emerald-400" />
                <h3 className="text-xl font-semibold">Strukturální mezery – OPRAVENO</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {structuralGaps.map((gap, i) => (
                  <div key={i} className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={14} className="text-emerald-400" />
                      <span className="font-medium text-sm">{gap.title}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{gap.description}</p>
                    <p className="text-xs text-emerald-400">→ {gap.solution}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={20} className="text-amber-400" />
                <h3 className="text-xl font-semibold">Produktové mezery – VYŽADUJÍ AKCI</h3>
              </div>
              <div className="space-y-3">
                {productGaps.map((gap, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${
                    gap.priority === 'critical' ? 'bg-red-500/5 border-red-500/20' : 'bg-amber-500/5 border-amber-500/20'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        gap.priority === 'critical' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {gap.priority === 'critical' ? '🚨 Kritické' : '⚠️ Důležité'}
                      </span>
                      <span className="font-medium">{gap.title}</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-1">{gap.description}</p>
                    <p className="text-sm text-blue-400">→ {gap.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Business Impact */}
        {activeSection === 'impact' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Business Impact</h2>

            <div className="grid grid-cols-3 gap-4">
              {[
                { title: "Zákaznická zkušenost", items: ["Rychlejší nalezení", "Lepší cross-selling", "140+ barev viditelných"] },
                { title: "Business přínosy", items: ["Vyšší konverze", "Vyšší AOV", "Lepší retence"] },
                { title: "SEO & Marketing", items: ["Lepší vyhledávání", "Cílenější reklamy", "Content příležitosti"] }
              ].map((section, i) => (
                <div key={i} className="p-5 bg-slate-800/50 border border-slate-700/50 rounded-2xl">
                  <div className="text-[10px] tracking-widest text-slate-500 font-mono mb-3">{section.title}</div>
                  {section.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm mb-2">
                      <CheckCircle size={14} className="text-emerald-400" />
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                <div className="flex items-center gap-2 mb-3 text-emerald-400">
                  <CheckCircle size={18} /> <span className="font-semibold">Okamžitě</span>
                </div>
                {["Průmyslové podlahy (35)", "Spárovací hmoty (180)", "Silikony (75)", "Přírodní kámen (55)"].map((item, i) => (
                  <div key={i} className="text-sm text-slate-400 mb-1">• {item}</div>
                ))}
              </div>
              <div className="p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
                <div className="flex items-center gap-2 mb-3 text-amber-400">
                  <AlertTriangle size={18} /> <span className="font-semibold">Vyžaduje akci</span>
                </div>
                {["UFH badging", "Malá balení", "Low-VOC", "Bundle kity", "Digitální průvodci"].map((item, i) => (
                  <div key={i} className="text-sm text-slate-400 mb-1">• {item}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
