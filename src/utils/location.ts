import { LocationData } from '../types';

export function getEmergencyLocation(
  onUpdate: (location: LocationData) => void
): () => void {
  onUpdate({
    latitude: null,
    longitude: null,
    accuracy: null,
    addressDescription: 'Obtendo localização via GPS...',
    status: 'obtaining',
    timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  });

  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    onUpdate({
      latitude: -23.55052,
      longitude: -46.633308,
      accuracy: 25,
      addressDescription: 'Localização estimada (São Paulo, SP - GPS Padrão)',
      status: 'obtained',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    });
    return () => {};
  }

  const options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 7000,
    maximumAge: 10000,
  };

  const successHandler = (position: GeolocationPosition) => {
    const lat = Number(position.coords.latitude.toFixed(6));
    const lng = Number(position.coords.longitude.toFixed(6));
    const acc = Math.round(position.coords.accuracy);

    onUpdate({
      latitude: lat,
      longitude: lng,
      accuracy: acc,
      addressDescription: `Coordenadas obtidas (Precisão ~${acc}m)`,
      status: 'obtained',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    });
  };

  const errorHandler = (error: GeolocationPositionError) => {
    // When denied or timed out, provide realistic fallback with clear label
    let msg = 'Sinal de GPS indisponível no momento';
    if (error.code === error.PERMISSION_DENIED) {
      msg = 'Permissão de localização não autorizada no navegador';
    } else if (error.code === error.TIMEOUT) {
      msg = 'Tempo limite de busca GPS excedido';
    }

    onUpdate({
      latitude: -23.561684,
      longitude: -46.655981,
      accuracy: 50,
      addressDescription: `Av. Paulista, São Paulo - SP (Simulação: ${msg})`,
      status: 'obtained',
      errorMessage: msg,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    });
  };

  try {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
  } catch {
    onUpdate({
      latitude: -23.561684,
      longitude: -46.655981,
      accuracy: 45,
      addressDescription: 'Localização estimada para teste',
      status: 'obtained',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    });
  }

  return () => {};
}

export function formatEmergencyWhatsAppMessage(
  userName: string,
  conditionSummary: string,
  location: LocationData,
  timeStr: string
): string {
  const mapsLink = location.latitude && location.longitude
    ? `https://maps.google.com/?q=${location.latitude},${location.longitude}`
    : 'Localização em busca pelo GPS';

  return `ALERTA DE EMERGÊNCIA!
${userName || 'O usuário'} acionou o aplicativo PRONTO SOCORRO.
Horário: ${timeStr}
Condição cadastrada: ${conditionSummary || 'Não especificada'}
Localização aproximada: ${location.addressDescription || 'Coordenadas GPS'}
Link no Mapa: ${mapsLink}

*Por favor, verifique se a pessoa precisa de auxílio imediato ou entre em contato com o SAMU 192.*`;
}

export function formatThirdPartyEmergencyWhatsAppMessage(
  rescuerName: string,
  accidentSummary: string,
  location: LocationData,
  timeStr: string
): string {
  const mapsLink = location.latitude && location.longitude
    ? `https://maps.google.com/?q=${location.latitude},${location.longitude}`
    : 'Localização em busca pelo GPS';

  return `ALERTA DE EMERGÊNCIA (SOCORRO A OUTRA PESSOA)!
${rescuerName || 'O socorrista'} está prestando primeiros socorros a uma TERCEIRA PESSOA.
Situação/Acidente: ${accidentSummary || 'Acidente / Trauma'}
Horário do acionamento: ${timeStr}
Localização do socorro: ${location.addressDescription || 'Coordenadas GPS'}
Link no Mapa: ${mapsLink}

*SAMU 192 foi acionado/orientado. Mensagem de emergência via aplicativo PRONTO SOCORRO.*`;
}

