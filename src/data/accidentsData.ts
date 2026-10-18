import { AccidentKey } from '../types';

export interface AccidentStep {
  title: string;
  description: string;
  badge?: string;
}

export interface ChokingAgeGroup {
  id: 'adult' | 'infant' | 'unconscious';
  title: string;
  subtitle: string;
  steps: AccidentStep[];
  prohibitions: string[];
}

export interface AccidentDetail {
  key: AccidentKey;
  emoji: string;
  title: string;
  shortDesc: string;
  urgencyLevel: 'Crítico' | 'Urgente' | 'Atenção';
  urgencyColor: string;
  quickActionSummary: string;
  steps: AccidentStep[];
  prohibitions: string[];
  whenToCall192: string[];
  whenToSeekMedical?: string[];
  escalationToCPR?: boolean;
  chokingAgeGroups?: ChokingAgeGroup[];
}

export const ACCIDENTS_DATA: Record<AccidentKey, AccidentDetail> = {
  severe_bleeding: {
    key: 'severe_bleeding',
    emoji: '🩸',
    title: 'Sangramento Intenso (Hemorragia)',
    shortDesc: 'Sangue jorrando ou escorrendo sem parar',
    urgencyLevel: 'Crítico',
    urgencyColor: 'bg-red-500/20 text-red-300 border-red-500/40',
    quickActionSummary: 'Aperte com as 2 mãos no corte sem soltar. Ligue 192.',
    steps: [
      {
        title: '1. Ligue 192 SAMU no viva-voz',
        description: 'Peça socorro urgente imediatamente ou mande alguém ao lado ligar.',
        badge: 'Agora',
      },
      {
        title: '2. Pressione o corte com as 2 mãos',
        description: 'Coloque um pano limpo ou toalha grossa e aperte com toda a força no ponto onde sai o sangue.',
      },
      {
        title: '3. NÃO solte a pressão',
        description: 'Se o pano encharcar, NUNCA retire. Coloque outro pano grosso por cima e continue apertando ainda mais forte.',
      },
      {
        title: '4. Deite a pessoa no chão',
        description: 'Mantenha a pessoa deitada de costas e cubra com um cobertor ou casaco.',
      },
    ],
    prohibitions: [
      'NUNCA tire o pano encharcado (ponha outro por cima).',
      'NÃO faça torniquete com arame, fio ou corda.',
      'NÃO dê água ou remédios para beber.',
      'NÃO arranque facas ou vidros cravados no corpo.',
    ],
    whenToCall192: [
      'Sangue jorrando ou que não para após 5 minutos apertando.',
      'Pessoa pálida, suando frio, tonta ou desmaiando.',
      'Ferimento por tiro ou faca.',
    ],
    escalationToCPR: true,
  },

  cut_wound: {
    key: 'cut_wound',
    emoji: '🩸',
    title: 'Corte / Ferimento Comum',
    shortDesc: 'Cortes, arranhões e pequenos sangramentos',
    urgencyLevel: 'Atenção',
    urgencyColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    quickActionSummary: 'Aperte com pano limpo por 5 min e lave com água e sabão.',
    steps: [
      {
        title: '1. Aperte o ferimento',
        description: 'Pressione com pano limpo ou gaze por 5 a 10 minutos sem soltar.',
      },
      {
        title: '2. Levante o membro',
        description: 'Se o corte for na mão, braço ou perna, mantenha levantado acima do peito.',
      },
      {
        title: '3. Lave com água e sabão',
        description: 'Lave o corte direto na água corrente da torneira com sabão neutro.',
      },
      {
        title: '4. Cubra o local',
        description: 'Coloque curativo ou gaze limpa e seca.',
      },
    ],
    prohibitions: [
      'NÃO use pó de café, açúcar, pasta de dente ou receitas caseiras.',
      'NÃO amarre fios, barbantes ou panos apertados demais.',
      'NÃO puxe vidros ou objetos cravados fundo no corte.',
      'NÃO jogue álcool puro direto dentro da ferida.',
    ],
    whenToCall192: [
      'Corte que não para de sangrar após 10 minutos de pressão.',
      'Cortes fundos no pescoço, tórax ou abdômen.',
      'Pessoa suando frio ou perdendo os sentidos.',
    ],
    whenToSeekMedical: [
      'Corte aberto que precise de pontos (sutura).',
      'Ferimento por prego enferrujado ou mordida de bicho (risco de infecção/tétano).',
    ],
  },

  fracture_dislocation: {
    key: 'fracture_dislocation',
    emoji: '🦴',
    title: 'Fratura / Osso Quebrado / Luxação',
    shortDesc: 'Membro torto, inchaço rápido e dor insuportável',
    urgencyLevel: 'Urgente',
    urgencyColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    quickActionSummary: 'Não mexa no membro. Imobilize na posição que está.',
    steps: [
      {
        title: '1. Não mexa no membro',
        description: 'Deixe o braço ou perna parado exatamente na posição em que ficou. Não tente esticar.',
        badge: 'Regra',
      },
      {
        title: '2. Apoie com algo macio',
        description: 'Coloque almofadas, casacos enrolados ou toalhas ao lado para não deixar mexer.',
      },
      {
        title: '3. Aplique gelo com pano',
        description: 'Coloque bolsa de gelo enrolada em toalha por 15 minutos (nunca gelo direto na pele).',
      },
      {
        title: '4. Se o osso furou a pele (fratura exposta)',
        description: 'Cubra com pano limpo e seco. Não empurre o osso. Ligue 192 agora.',
      },
    ],
    prohibitions: [
      'NUNCA tente puxar ou "colocar o osso no lugar".',
      'NÃO tente desentortar o braço ou a perna.',
      'NÃO massageie nem passe pomadas quentes.',
      'NÃO deixe a pessoa apoiar o pé ou andar.',
    ],
    whenToCall192: [
      'Osso furando a pele (fratura exposta).',
      'Suspeita de osso quebrado na bacia, quadril ou coxa.',
      'Dedos ou mão ficando roxos, frios ou dormentes.',
    ],
    whenToSeekMedical: [
      'Qualquer luxação (ombro ou dedo fora do lugar).',
      'Dor forte e inchaço após tombo que impeça movimentar.',
    ],
  },

  fall_trauma: {
    key: 'fall_trauma',
    emoji: '🤕',
    title: 'Queda / Pancada na Cabeça (Trauma)',
    shortDesc: 'Queda de escada, tombo forte ou batida na cabeça',
    urgencyLevel: 'Urgente',
    urgencyColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    quickActionSummary: 'NÃO mexa na pessoa se houver dor no pescoço ou desmaio.',
    steps: [
      {
        title: '1. Mande a pessoa ficar imóvel',
        description: 'Não deixe a pessoa tentar levantar. Mantenha ela deitada no chão.',
        badge: 'Importante',
      },
      {
        title: '2. Segure a cabeça',
        description: 'Segure suavemente a cabeça com as duas mãos para ela não virar o pescoço.',
      },
      {
        title: '3. Verifique se ela fala e respira',
        description: 'Pergunte o nome dela e veja se o peito sobe e desce normalmente.',
      },
      {
        title: '4. Queda leve sem sinal de perigo',
        description: 'Apenas galo na cabeça? Aplique compressa de gelo com pano por 15 minutos.',
      },
    ],
    prohibitions: [
      'NÃO levante a pessoa nem tente colocá-la sentada.',
      'NÃO tire capacete em acidente de trânsito.',
      'NÃO sacuda a pessoa se ela desmaiar.',
      'NÃO dê água, comida ou remédio de dor.',
    ],
    whenToCall192: [
      'A pessoa desmaiou, mesmo que por 10 segundos.',
      'Vômitos depois da batida.',
      'Fala enrolada, confusão ou sonolência exagerada.',
      'Dor forte no pescoço ou nas costas.',
      'Sangue ou líquido claro saindo pelo nariz ou ouvidos.',
    ],
    escalationToCPR: true,
  },

  burn: {
    key: 'burn',
    emoji: '🔥',
    title: 'Queimadura',
    shortDesc: 'Fogo, água quente, óleo, vapor ou panela',
    urgencyLevel: 'Urgente',
    urgencyColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    quickActionSummary: 'Água corrente fria por 15 minutos. Não fure bolhas.',
    steps: [
      {
        title: '1. Afaste do calor',
        description: 'Tire a pessoa de perto do fogo, óleo ou líquido quente.',
      },
      {
        title: '2. Água corrente por 15 minutos',
        description: 'Coloque a queimadura embaixo da torneira ou chuveiro com água fria por 15 minutos seguidos.',
        badge: 'Faça Agora',
      },
      {
        title: '3. Tire anéis e pulseiras',
        description: 'Retire anéis, relógios e sapatos da área antes de começar a inchar.',
      },
      {
        title: '4. Cubra com plástico filme ou pano limpo',
        description: 'Cubra sem apertar com plástico de cozinha ou gaze seca.',
      },
    ],
    prohibitions: [
      'NUNCA fure bolhas de queimadura.',
      'NÃO use pasta de dente, manteiga, óleo, café ou pomadas caseiras.',
      'NÃO coloque gelo direto na pele.',
      'NÃO arranque tecidos grudados na queimadura.',
    ],
    whenToCall192: [
      'Queimadura no rosto, pescoço, mãos ou partes íntimas.',
      'Queimadura maior que a palma da mão.',
      'Pele esbranquiçada, preta ou sem dor (queimadura profunda).',
      'Inalação de fumaça com tosse ou falta de ar.',
    ],
  },

  electric_shock: {
    key: 'electric_shock',
    emoji: '⚡',
    title: 'Choque Elétrico',
    shortDesc: 'Fios soltos, tomadas ou aparelhos elétricos',
    urgencyLevel: 'Crítico',
    urgencyColor: 'bg-red-500/20 text-red-300 border-red-500/40',
    quickActionSummary: 'NÃO encoste na vítima. Desligue a chave geral primeiro.',
    steps: [
      {
        title: '1. Não encoste na pessoa',
        description: 'Se a pessoa ainda estiver ligada no fio ou tomada, você levará o choque junto.',
        badge: 'Cuidado',
      },
      {
        title: '2. Desligue o disjuntor geral',
        description: 'Vá na caixa de luz e desligue a chave geral da casa.',
      },
      {
        title: '3. Se não conseguir desligar',
        description: 'Afaste o fio com cabo de vassoura de madeira SECA ou cano de plástico SECO. Nunca use metal.',
      },
      {
        title: '4. Ligue 192 e cheque a respiração',
        description: 'Se a pessoa não responder e não respirar: inicie massagem cardíaca (RCP) imediatamente.',
      },
    ],
    prohibitions: [
      'NÃO toque na vítima com mãos desprotegidas.',
      'NÃO jogue água nos fios ou na pessoa.',
      'NÃO chegue perto de fios caídos na rua (ligue 193 Bombeiros).',
      'NÃO deixe a pessoa ir embora sem avaliação médica.',
    ],
    whenToCall192: [
      'Pessoa desacordada ou sem respirar.',
      'Choque em tomadas de 220V ou aparelhos grandes.',
      'Queimaduras visíveis no corpo.',
    ],
    escalationToCPR: true,
  },

  choking: {
    key: 'choking',
    emoji: '😮',
    title: 'Engasgo (Não Consegue Respirar)',
    shortDesc: 'Alimento ou objeto preso na garganta',
    urgencyLevel: 'Crítico',
    urgencyColor: 'bg-red-500/20 text-red-300 border-red-500/40',
    quickActionSummary: '5 batidas nas costas e manobra de Heimlich.',
    steps: [],
    chokingAgeGroups: [
      {
        id: 'adult',
        title: 'Adulto ou Criança (> 1 ano)',
        subtitle: 'Pessoa acordada com as mãos na garganta',
        steps: [
          {
            title: '1. Mande tossir',
            description: 'Se a pessoa tossir forte, deixe tossir sem bater nas costas.',
          },
          {
            title: '2. Se não sai som (asfixia)',
            description: 'Fique atrás dela, incline-a para frente e dê 5 batidas fortes entre as costas com a base da mão.',
          },
          {
            title: '3. Manobra de Heimlich',
            description: 'Abrace a pessoa pela cintura. Feche o punho logo acima do umbigo. Segure com a outra mão e puxe com força PARA DENTRO E PARA CIMA.',
            badge: 'Heimlich',
          },
          {
            title: '4. Repita até o objeto sair',
            description: 'Repita os puxões até a pessoa conseguir respirar ou tossir.',
          },
        ],
        prohibitions: [
          'NÃO enfie o dedo na garganta às cegas.',
          'NÃO dê copos de água ou miolo de pão.',
        ],
      },
      {
        id: 'infant',
        title: 'Bebê (< 1 ano)',
        subtitle: 'Engasgado com leite ou brinquedo pequeno',
        steps: [
          {
            title: '1. Deite o bebê no antebraço',
            description: 'Coloque de bruços no seu braço, com a cabeça mais baixa que o corpo. Segure a mandíbula sem tapar a boca.',
            badge: 'Posição',
          },
          {
            title: '2. Dê 5 batidas nas costas',
            description: 'Bata 5 vezes com a palma da mão entre as escápulas do bebê.',
          },
          {
            title: '3. Vire o bebê de frente',
            description: 'Vire-o de barriga para cima ainda com a cabeça mais baixa. Faça 5 compressões no meio do peito com 2 dedos.',
          },
          {
            title: '4. Repita até desengasgar',
            description: 'Alterne 5 batidas nas costas e 5 no peito até o bebê chorar.',
          },
        ],
        prohibitions: [
          'NUNCA sacuda o bebê.',
          'NÃO faça a manobra de adulto no abdômen do bebê.',
        ],
      },
      {
        id: 'unconscious',
        title: 'Pessoa Inconsciente (Desmaiou)',
        subtitle: 'Desfaleceu por falta de ar',
        steps: [
          {
            title: '1. Ligue 192 SAMU agora',
            description: 'Ligue no viva-voz imediatamente.',
            badge: 'Urgência',
          },
          {
            title: '2. Deite no chão de barriga para cima',
            description: 'Coloque a pessoa deitada no piso firme.',
          },
          {
            title: '3. Inicie massagem cardíaca (RCP)',
            description: '30 compressões no centro do peito. A pressão empurra o objeto para fora.',
          },
          {
            title: '4. Olhe a boca',
            description: 'Se vir o objeto solto, tire com o dedo. Se NÃO vir nada, NÃO enfie o dedo e continue a massagem.',
          },
        ],
        prohibitions: [
          'NUNCA passe o dedo às cegas dentro da garganta.',
        ],
      },
    ],
    prohibitions: [
      'NÃO enfie o dedo na garganta às cegas.',
      'NÃO dê água ou pão.',
    ],
    whenToCall192: [
      'Pessoa não consegue emitir som nenhum.',
      'Pessoa perdeu os sentidos ou ficou com lábios roxos.',
      'Bebê que não volta a respirar.',
    ],
    escalationToCPR: true,
  },
};
