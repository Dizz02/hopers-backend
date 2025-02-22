import { ChainTypes } from './chain';

export enum TokenType {
    JUNOX = 'ujuno',
    HOPE = 'hope',
    RAW = 'raw',
    NETA = 'neta',
    ATOM = 'ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9',
    USDC = 'ibc/EAC38D55372F38F1AFD68DF7FE9EF762DCF69F26520643CF3F9D292A738D8034',
    HOPERS = 'hopers',
    PUNK = 'punk',
    HUAHUA = 'ibc/D836B191CDAE8EDACDEBE7B64B504C5E06CC17C6A072DAF278F9A96DF66F6241',
    CANLAB = 'canlab',
    RED = 'red',
    BLUE = 'blue',
    WYND = 'wynd',
    SGNL = 'sgnl',
    RACOON = 'racoon',
    GLTO = 'glto',
    AQUA = 'aqua',
    OSMO = 'ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518',
    DRGN = 'drgn',
    BANANA = 'banana',
    CZAR = 'czar',
    KUJIRA = 'ibc/7F7D3698E2E3484D576001608BB84D13F5C8B02B97359716ECC60A29A7523BF3',
    EVMOS = 'ibc/9B990F95D85E7CA8C46544975776CAA20A3DEE3507EEA829A4000D8D65617F6D',
    STARS = 'ibc/F6B367385300865F654E110976B838502504231705BAC0849B0651C226385885',
    MARS = 'ibc/281FEE887CDF71EB9C1FEFC554822DCB06BE4E8A8BFF944ED64E3D03437E9384',
    HOWL = 'howl',
    PLANQ = 'ibc/9AFC3B24C30BE40250D3F40818CFED98C74EA320F744AA6CF2129F0D109E6FF5',
    KLEO = 'kleo',
    JAPE = 'jape',
    HARBOR = 'ibc/2D8FA8721F44AE790D2A4D07775C16DD275B6FD83DA6FF29E76FED5BB6A92764',
    CMDX = 'ibc/946AD96F278770521526D7283F58268DA2F6ACDDE40324A9D1C86811D78C86A0',
    CMST = 'ibc/DD057BB58DCBEE8F7C0CDF0B9AE4A2656B00E3C9745341180400B60833EEC9FD',
    ETH = 'ibc/95A45A81521EAFDBEDAEEB6DA975C02E55B414C95AD3CE50709272366A90CA17',
    wBTC = 'ibc/5EF597EA4E863132BFD3E051AC6BAA0175F00913D3256A41F11DC425C39527D6',
    PHMN = 'phmn',
    GRDN = 'grdn',
    PEPEC = 'pepec',
    INVDRS = 'invdrs',
    INCEL = 'incel',
    CASA = 'casa',
    EMPWR = 'empwr',
    // TEST = 'test',
}

export type TokenStatusType = {
    isNativeCoin: boolean;
    isIBCCoin: boolean;
    contractAddress?: string;
    originChain?: ChainTypes;
    chain: ChainTypes;
    coinName?: string;
    decimal?: number;
    denom?: string;
};
