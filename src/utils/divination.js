/**
 * 周易大衍筮法（蓍草起卦）核心逻辑
 * 严格还原“大衍之数五十，其用四十有九”
 */

// 64卦名与二进制映射表 (Top to Bottom: 1=Yang, 0=Yin)
// Source: Wikibooks / King Wen Sequence
const GUA_MAP = {
  "111111": { name: "乾", symbol: "䷀" },
  "000000": { name: "坤", symbol: "䷁" },
  "010001": { name: "屯", symbol: "䷂" },
  "100010": { name: "蒙", symbol: "䷃" },
  "010111": { name: "需", symbol: "䷄" },
  "111010": { name: "訟", symbol: "䷅" },
  "000010": { name: "師", symbol: "䷆" },
  "010000": { name: "比", symbol: "䷇" },
  "110111": { name: "小畜", symbol: "䷈" },
  "111011": { name: "履", symbol: "䷉" },
  "000111": { name: "泰", symbol: "䷊" },
  "111000": { name: "否", symbol: "䷋" },
  "111101": { name: "同人", symbol: "䷌" },
  "101111": { name: "大有", symbol: "䷍" },
  "000100": { name: "謙", symbol: "䷎" },
  "001000": { name: "豫", symbol: "䷏" },
  "011001": { name: "隨", symbol: "䷐" },
  "100110": { name: "蠱", symbol: "䷑" },
  "000011": { name: "臨", symbol: "䷒" },
  "110000": { name: "觀", symbol: "䷓" },
  "101001": { name: "噬嗑", symbol: "䷔" },
  "100101": { name: "賁", symbol: "䷕" },
  "100000": { name: "剝", symbol: "䷖" },
  "000001": { name: "復", symbol: "䷗" },
  "111001": { name: "無妄", symbol: "䷘" },
  "100111": { name: "大畜", symbol: "䷙" },
  "100001": { name: "頤", symbol: "䷚" },
  "011110": { name: "大過", symbol: "䷛" },
  "010010": { name: "坎", symbol: "䷜" },
  "101101": { name: "離", symbol: "䷝" },
  "011100": { name: "咸", symbol: "䷞" },
  "001110": { name: "恆", symbol: "䷟" },
  "111100": { name: "遯", symbol: "䷠" },
  "001111": { name: "大壯", symbol: "䷡" },
  "101000": { name: "晉", symbol: "䷢" },
  "000101": { name: "明夷", symbol: "䷣" },
  "110101": { name: "家人", symbol: "䷤" },
  "101011": { name: "睽", symbol: "䷥" },
  "010100": { name: "蹇", symbol: "䷦" },
  "001010": { name: "解", symbol: "䷧" },
  "100011": { name: "損", symbol: "䷨" },
  "110001": { name: "益", symbol: "䷩" },
  "011111": { name: "夬", symbol: "䷪" },
  "111110": { name: "姤", symbol: "䷫" },
  "011000": { name: "萃", symbol: "䷬" },
  "000110": { name: "升", symbol: "䷭" },
  "011010": { name: "困", symbol: "䷮" },
  "010110": { name: "井", symbol: "䷯" },
  "011101": { name: "革", symbol: "䷰" },
  "101110": { name: "鼎", symbol: "䷱" },
  "001001": { name: "震", symbol: "䷲" },
  "100100": { name: "艮", symbol: "䷳" },
  "110100": { name: "漸", symbol: "䷴" },
  "001011": { name: "歸妹", symbol: "䷵" },
  "001101": { name: "豐", symbol: "䷶" },
  "101100": { name: "旅", symbol: "䷷" },
  "110110": { name: "巽", symbol: "䷸" },
  "011011": { name: "兌", symbol: "䷹" },
  "110010": { name: "渙", symbol: "䷺" },
  "010011": { name: "節", symbol: "䷻" },
  "110011": { name: "中孚", symbol: "䷼" },
  "001100": { name: "小過", symbol: "䷽" },
  "010101": { name: "既濟", symbol: "䷾" },
  "101010": { name: "未濟", symbol: "䷿" }
};

/**
 * 模拟"分二、挂一、揲四、归奇"的一变过程
 * @param {number} total 蓍草总数
 * @returns {object} { remaining: number, removed: number }
 */
function one_change(total) {
  // 分二 (Split into two piles)
  // 随机切分，保证两边至少有1根
  const left = Math.floor(Math.random() * (total - 2)) + 1;
  const right = total - left;

  // 挂一 (Take one from right pile)
  // 将右手的一根挂在小指间
  const gua_yi = 1;
  const right_after_gua = right - 1;

  // 揲四 (Count by 4)
  // 左手揲四，余数为归奇
  let left_rem = left % 4;
  if (left_rem === 0) left_rem = 4; // 余0则为4

  // 右手揲四
  let right_rem = right_after_gua % 4;
  if (right_rem === 0) right_rem = 4; // 余0则为4

  // 归奇总数 = 挂一 + 左余 + 右余
  const removed = gua_yi + left_rem + right_rem;
  const remaining = total - removed;

  return { remaining, removed };
}

/**
 * 三变成一爻
 * @returns {number} 爻值 (6, 7, 8, 9)
 */
function san_bian() {
  let total = 49; // 大衍之数五十，其用四十有九

  // 第一变
  const change1 = one_change(total);
  total = change1.remaining;

  // 第二变
  const change2 = one_change(total);
  total = change2.remaining;

  // 第三变
  const change3 = one_change(total);
  total = change3.remaining;

  // 三变之后，剩余数除以4
  // 剩余数可能是 36 (9), 32 (8), 28 (7), 24 (6)
  const yao_value = total / 4;
  return yao_value;
}

/**
 * 获取爻的名称
 * @param {number} position 1-6
 * @param {number} value 6,7,8,9
 */
function get_yao_name(position, value) {
  const posNames = ["初", "二", "三", "四", "五", "上"];
  const isYang = (value % 2 !== 0); // 7, 9 -> Yang
  
  const posName = posNames[position - 1];
  
  if (position === 1 || position === 6) {
      // 初/上: 阴称六，阳称九。位置在前。 e.g. 初九, 上六
      // 这里的规则是：
      // 初九 (Yang at 1), 初六 (Yin at 1)
      // 上九 (Yang at 6), 上六 (Yin at 6)
      return `${posName}${isYang ? "九" : "六"}`;
  } else {
      // 中间: 阴称六，阳称九。数值在前? No.
      // Standard: "九二", "六二", etc. Value (Nine/Six) first, then Position.
      // Wait, let's double check.
      // 1: 初九
      // 2: 九二 / 六二
      // 3: 九三 / 六三
      // 4: 九四 / 六四
      // 5: 九五 / 六五
      // 6: 上九
      
      // So for 2,3,4,5: ValueChar + PosName
      return `${isYang ? "九" : "六"}${posName}`;
  }
}

/**
 * 生成本卦和之卦
 * @returns {object} 卦象结果
 */
export function generate_gua() {
  const yao_values = []; // Bottom to Top
  
  // 生成6爻
  for (let i = 0; i < 6; i++) {
    yao_values.push(san_bian());
  }

  // 计算本卦 (Original) 和 之卦 (Changed) 的二进制
  // 9 (Old Yang) -> Original: 1, Changed: 0
  // 6 (Old Yin)  -> Original: 0, Changed: 1
  // 7 (Young Yang) -> Original: 1, Changed: 1
  // 8 (Young Yin) -> Original: 0, Changed: 0

  let ben_gua_binary = "";
  let zhi_gua_binary = "";
  const changed_yaos = [];

  // yao_values is [bottom, ..., top]
  // But binary string is usually represented Top -> Bottom for lookup
  // Let's build Top -> Bottom string
  
  for (let i = 5; i >= 0; i--) {
    const val = yao_values[i];
    const isYang = (val % 2 !== 0);
    const isChanging = (val === 6 || val === 9);

    // Ben Gua
    ben_gua_binary += isYang ? "1" : "0";

    // Zhi Gua
    if (isChanging) {
      // Change polarity
      zhi_gua_binary += isYang ? "0" : "1";
    } else {
      // Keep polarity
      zhi_gua_binary += isYang ? "1" : "0";
    }

    if (isChanging) {
      // Record position (1-based index from bottom)
      // i is 0-based index from bottom? No, loop is 5 down to 0.
      // Real position is i+1.
      changed_yaos.push({
        position: i + 1,
        value: val,
        name: get_yao_name(i + 1, val)
      });
    }
  }

  // Sort changed_yaos by position (asc)
  changed_yaos.sort((a, b) => a.position - b.position);

  const ben_gua_info = GUA_MAP[ben_gua_binary] || { name: "未知", symbol: "?" };
  const zhi_gua_info = GUA_MAP[zhi_gua_binary] || { name: "未知", symbol: "?" };

  // Format yao symbols for display (Bottom to Top for list)
  const yao_display = yao_values.map(val => {
    if (val === 6) return "— — ×"; // Old Yin
    if (val === 9) return "——— ○"; // Old Yang
    if (val === 8) return "— —";   // Young Yin
    if (val === 7) return "———";   // Young Yang
  });

  return {
    ben_gua: {
      name: ben_gua_info.name,
      symbol: ben_gua_info.symbol,
      binary: ben_gua_binary
    },
    zhi_gua: {
      name: zhi_gua_info.name,
      symbol: zhi_gua_info.symbol,
      binary: zhi_gua_binary
    },
    bian_yao: {
      count: changed_yaos.length,
      list: changed_yaos.map(y => y.name),
      details: changed_yaos
    },
    yao_values: yao_values, // Bottom to Top
    yao_display_list: yao_display.reverse() // Top to Bottom for display usually? Or list from bottom up?
    // User asked for "变爻位置列表：[初九、六二……]".
  };
}
