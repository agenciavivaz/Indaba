# SignalPulse

Marca um sinal novo com um anel de brasa que se expande **uma vez** (`dur-pulse`, 1200ms) e um ponto fixo que fica enquanto o sinal for recente.

**O que você fornece:** `children` (o nó, assento ou ícone que recebeu o sinal), `active` (`false` para desligar) e `label` (texto para leitor de tela, como "Sinal novo há 3 horas").

- Toca em dois momentos só: quando o resultado registrado pelo BDR vira sinal, e na abertura do Território para sinais das últimas 24h. Nunca em loop, nunca em hover.
- Com `prefers-reduced-motion`, o anel fica parado e visível, sem animação.
- É a única animação em brasa do sistema. Se houver mais de cinco pulsos na tela, mostre o ponto fixo sem anel.
