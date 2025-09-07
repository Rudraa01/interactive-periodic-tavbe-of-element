// Utilities to compute grid positions for the periodic table (1..118)
// 18-column layout; Lanthanides (57-71) and Actinides (89-103) mapped to separate rows.
export interface Position { col: number; row: number; }

// Pre-computed map for first 118 based on standard periodic arrangement.
// For brevity and focus on logic, only a subset is filled now; remaining entries should be added.
// Placeholder rows for Lanthanides row: row 8, Actinides row: row 9 (after main 7 periods)
const base: Record<number, Position> = {
  1:{col:1,row:1},2:{col:18,row:1},
  3:{col:1,row:2},4:{col:2,row:2},5:{col:13,row:2},6:{col:14,row:2},7:{col:15,row:2},8:{col:16,row:2},9:{col:17,row:2},10:{col:18,row:2},
  11:{col:1,row:3},12:{col:2,row:3},13:{col:13,row:3},14:{col:14,row:3},15:{col:15,row:3},16:{col:16,row:3},17:{col:17,row:3},18:{col:18,row:3},
  19:{col:1,row:4},20:{col:2,row:4},21:{col:3,row:4},22:{col:4,row:4},23:{col:5,row:4},24:{col:6,row:4},25:{col:7,row:4},26:{col:8,row:4},27:{col:9,row:4},28:{col:10,row:4},29:{col:11,row:4},30:{col:12,row:4},31:{col:13,row:4},32:{col:14,row:4},33:{col:15,row:4},34:{col:16,row:4},35:{col:17,row:4},36:{col:18,row:4},
  37:{col:1,row:5},38:{col:2,row:5},39:{col:3,row:5},40:{col:4,row:5},41:{col:5,row:5},42:{col:6,row:5},43:{col:7,row:5},44:{col:8,row:5},45:{col:9,row:5},46:{col:10,row:5},47:{col:11,row:5},48:{col:12,row:5},49:{col:13,row:5},50:{col:14,row:5},51:{col:15,row:5},52:{col:16,row:5},53:{col:17,row:5},54:{col:18,row:5},
  55:{col:1,row:6},56:{col:2,row:6},57:{col:3,row:8},58:{col:4,row:8},59:{col:5,row:8},60:{col:6,row:8},61:{col:7,row:8},62:{col:8,row:8},63:{col:9,row:8},64:{col:10,row:8},65:{col:11,row:8},66:{col:12,row:8},67:{col:13,row:8},68:{col:14,row:8},69:{col:15,row:8},70:{col:16,row:8},71:{col:17,row:8},72:{col:4,row:6},73:{col:5,row:6},74:{col:6,row:6},75:{col:7,row:6},76:{col:8,row:6},77:{col:9,row:6},78:{col:10,row:6},79:{col:11,row:6},80:{col:12,row:6},81:{col:13,row:6},82:{col:14,row:6},83:{col:15,row:6},84:{col:16,row:6},85:{col:17,row:6},86:{col:18,row:6},
  87:{col:1,row:7},88:{col:2,row:7},89:{col:3,row:9},90:{col:4,row:9},91:{col:5,row:9},92:{col:6,row:9},93:{col:7,row:9},94:{col:8,row:9},95:{col:9,row:9},96:{col:10,row:9},97:{col:11,row:9},98:{col:12,row:9},99:{col:13,row:9},100:{col:14,row:9},101:{col:15,row:9},102:{col:16,row:9},103:{col:17,row:9},104:{col:4,row:7},105:{col:5,row:7},106:{col:6,row:7},107:{col:7,row:7},108:{col:8,row:7},109:{col:9,row:7},110:{col:10,row:7},111:{col:11,row:7},112:{col:12,row:7},113:{col:13,row:7},114:{col:14,row:7},115:{col:15,row:7},116:{col:16,row:7},117:{col:17,row:7},118:{col:18,row:7},
};

export function getPosition(atomicNumber: number): Position | undefined {
  return base[atomicNumber];
}

export const MAX_ROW = 9;
