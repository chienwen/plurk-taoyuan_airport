const dict = {
    "TPE": "台北桃園",
    "CYI": "嘉義",
    "CMJ": "七美",
    "GNI": "綠島",
    "HUN": "花蓮",
    "KHH": "高雄",
    "KNH": "金門",
    "MZG": "馬公",
    "MFK": "馬祖",
    "KYD": "蘭嶼",
    "PIF": "屏東",
    "WOT": "望安",
    "TSA": "松山",
    "TXG": "台中",
    "TTT": "台東",
    "TNN": "台南",
    "HKG": "香港",
    "CTS": "札幌",
    "FUK": "福岡",
    "HKD": "函館",
    "HND": "東京羽田",
    "NGO": "名古屋",
    "NRT": "東京成田",
    "OKD": "札幌",
    "OKA": "琉球",
    "KIX": "大阪",
    "SPK": "札幌",
    "MFM": "澳門",
    "SEL": "漢城",
    "ICN": "仁川",
    "CJU": "濟州",
    "PUS": "釜山",
    "BHY": "北海",
    "PEK": "北京首都",
    "PKX": "北京大興",
    "CAN": "廣州",
    "CGQ": "長春",
    "CSX": "長沙",
    "CTU": "成都",
    "CKG": "重慶",
    "DLC": "大連",
    "DYG": "張家界",
    "FOC": "福州",
    "KWL": "桂林",
    "KWE": "貴陽",
    "HAK": "海口",
    "HGH": "杭州",
    "HRB": "哈爾濱",
    "HFE": "合肥",
    "TNA": "濟南",
    "KMG": "昆明",
    "LHW": "蘭州",
    "LYA": "洛陽",
    "MXZ": "梅縣",
    "KHN": "南昌",
    "NKG": "南京",
    "NNG": "南寧",
    "NGB": "寧波",
    "SYX": "三亞",
    "SHA": "上海虹橋",
    "SHE": "瀋陽",
    "SZX": "深圳",
    "SWA": "汕頭",
    "TYN": "太原",
    "TSN": "天津",
    "TAO": "青島",
    "TXN": "黃山",
    "URC": "烏魯木齊",
    "WNZ": "溫州",
    "WUH": "武漢",
    "XMN": "廈門",
    "SIA": "西安",
    "XIY": "襄陽",
    "YNT": "煙台",
    "CGO": "鄭州",
    "ZUH": "珠海",
    "BAG": "碧港",
    "BWN": "汶萊",
    "BKK": "曼谷",
    "BOM": "孟買",
    "CCU": "加爾各答",
    "CEB": "宿霧",
    "CNX": "清邁",
    "CGP": "吉大港",
    "CMB": "可倫坡",
    "DAC": "達卡",
    "DEL": "新德里",
    "DPS": "巴里島",
    "DIL": "帝利",
    "HAN": "河內",
    "IPH": "怡保",
    "CGK": "雅加達",
    "KBL": "喀布爾",
    "KHI": "喀拉蚩",
    "KTM": "加德滿都",
    "BKI": "亞庇",
    "KUL": "吉隆坡",
    "KCH": "古晉",
    "LGK": "蘭卡威",
    "MAA": "馬德拉斯",
    "MLE": "馬爾地夫",
    "MDC": "馬納都",
    "MNL": "馬尼拉",
    "CRK": "安赫勒斯",
    "MES": "棉蘭",
    "INU": "諾魯",
    "PLM": "巨港",
    "PEN": "檳城",
    "PNH": "金邊",
    "HKT": "普吉島",
    "RGN": "仰光",
    "SGN": "胡自明市",
    "SPN": "塞班",
    "SBW": "詩誣",
    "SIN": "新加坡",
    "SOC": "梭羅",
    "SUB": "泗水",
    "TBU": "東加大埔",
    "VTE": "永珍",
    "ABI": "TEXAS",
    "ABR": "SOUTH",
    "ALS": "COLORADO",
    "ALB": "NEW",
    "ABQ": "阿波寇爾克",
    "AEX": "LOUISIANA",
    "ABE": "PENNSYLVANIA",
    "AIA": "NEBRASKA",
    "AMA": "TEXAS",
    "ANC": "安克拉治",
    "ATW": "WISCONSIN",
    "ACV": "CALIFORNIA",
    "AVL": "NORTH",
    "ASE": "COLORADO",
    "ATL": "亞特蘭大",
    "AGS": "GEORGIA",
    "AUS": "奧斯丁",
    "BFL": "CALIFORNIA",
    "BGR": "MAINE",
    "BTR": "LOUISIANA",
    "BPT": "TEXAS",
    "ZBV": "COLORADO",
    "BLI": "WASHINGTON",
    "BIL": "MONTANA",
    "BGM": "NEW",
    "BHM": "ALABAMA",
    "BOI": "IDAHO",
    "BOS": "波士頓",
    "BZN": "MONTANA",
    "BMI": "ILLINOIS",
    "BMG": "INDIANA",
    "BDL": "CONNECTICUT",
    "BKX": "SOUTH",
    "BUF": "水牛城",
    "BRL": "IOWA",
    "BTV": "VERMONT",
    "MDH": "ILLINOIS",
    "CLD": "CALIFORNIA",
    "CPR": "WYOMING",
    "CID": "IOWA",
    "CYS": "WYOMING",
    "CDR": "NEBRASKA",
    "CMI": "ILLINOIS",
    "CHS": "SOUTH",
    "CRW": "WEST",
    "CLT": "NORTH",
    "CHO": "VIRGINIA",
    "CHA": "TENNESSEE",
    "ORD": "芝加哥",
    "CIC": "CALIFORNIA",
    "CVG": "辛辛那提",
    "COD": "WYOMING",
    "COS": "COLORADO",
    "CAE": "SOUTH",
    "CSG": "GEORGIA",
    "CMH": "OHIO",
    "SBP": "CALIFORNIA",
    "CRP": "TEXAS",
    "CEZ": "COLORADO",
    "CLE": "克利夫蘭",
    "CEC": "CALIFORNIA",
    "DFW": "達拉斯",
    "DAY": "OHIO",
    "DAB": "FLORIDA",
    "DEC": "ILLINOIS",
    "DEN": "丹佛",
    "DVL": "NORTH",
    "DSM": "IOWA",
    "DTW": "底特律",
    "DIK": "NORTH",
    "DDC": "KANSAS",
    "DBQ": "IOWA",
    "DRO": "COLORADO",
    "EGE": "COLORADO",
    "ELP": "TEXAS",
    "ELM": "NEW",
    "ESC": "MICHIGAN",
    "EUG": "OREGON",
    "EVV": "INDIANA",
    "FRM": "MINNESOTA",
    "FAR": "NORTH",
    "FMN": "NEW",
    "FLL": "FLORIDA",
    "FMY": "FLORIDA",
    "FSM": "ARKANSAS",
    "FWA": "INDIANA",
    "FAT": "CALIFORNIA",
    "QWF": "COLORADO",
    "GCC": "WYOMING",
    "GNV": "FLORIDA",
    "GBG": "ILLINOIS",
    "GCK": "KANSAS",
    "GRI": "NEBRASKA",
    "GJT": "COLORADO",
    "GRR": "MICHIGAN",
    "GTF": "MONTANA",
    "GRB": "WISCONSIN",
    "GSO": "NORTH",
    "GSP": "SOUTH",
    "GUM": "關島",
    "GUC": "COLORADO",
    "HRL": "TEXAS",
    "HAR": "PENNSYLVANIA",
    "MDT": "PENNSYLVANIA",
    "HFD": "CONNECTICUT",
    "HDN": "COLORADO",
    "HYS": "KANSAS",
    "HNL": "夏威夷",
    "HOU": "休斯頓",
    "IAH": "休斯頓",
    "HON": "SOUTH",
    "HSV": "ALABAMA",
    "IPL": "CALIFORNIA",
    "IND": "印也安那",
    "IYK": "CALIFORNIA",
    "IMT": "MICHIGAN",
    "IWD": "MICHIGAN",
    "JAN": "MISSISSIPPI",
    "JAC": "WYOMING",
    "JAX": "FLORIDA",
    "JMS": "NORTH",
    "TRI": "TENNESSEE",
    "AZO": "MICHIGAN",
    "MKC": "MISSOURI",
    "MCI": "MISSOURI",
    "ILE": "TEXAS",
    "EYW": "FLORIDA",
    "TYS": "TENNESSEE",
    "LSE": "WISCONSIN",
    "LAF": "INDIANA",
    "LCH": "LOUISIANA",
    "LAN": "MICHIGAN",
    "LAR": "WYOMING",
    "LRD": "TEXAS",
    "LAS": "拉斯維加",
    "LEX": "KENTUCKY",
    "LBL": "KANSAS",
    "LNK": "NEBRASKA",
    "LIT": "小岩石城",
    "GGG": "TEXAS",
    "LAX": "洛杉機",
    "BUR": "CALIFORNIA",
    "LGB": "CALIFORNIA",
    "SDF": "KENTUCKY",
    "LYH": "VIRGINIA",
    "MFE": "TEXAS",
    "MSN": "WISCONSIN",
    "MHT": "NEW",
    "MBL": "MICHIGAN",
    "MCW": "IOWA",
    "MTO": "ILLINOIS",
    "MFR": "OREGON",
    "MLB": "FLORIDA",
    "MEM": "TENNESSEE",
    "MCE": "CALIFORNIA",
    "MIA": "邁阿密",
    "MAF": "TEXAS",
    "MSP": "明尼亞波利",
    "MKE": "米瓦克",
    "MSO": "MONTANA",
    "MOB": "ALABAMA",
    "MOD": "CALIFORNIA",
    "MLI": "ILLINOIS",
    "MRY": "CALIFORNIA",
    "MGM": "ALABAMA",
    "MTJ": "COLORADO",
    "MLU": "LOUISIANA",
    "MKG": "MICHIGAN",
    "MVN": "ILLINOIS",
    "BNA": "TENNESSEE",
    "ARA": "LOUISIANA",
    "LFT": "LOUISIANA",
    "MSY": "新奧爾良",
    "PHF": "VIRGINIA",
    "JFK": "紐約",
    "LGA": "紐約",
    "EWR": "紐約",
    "OFK": "NEBRASKA",
    "ORF": "VIRGINIA",
    "LBF": "NEBRASKA",
    "OAK": "CALIFORNIA",
    "OKC": "奧克拉荷馬城",
    "OMA": "NEBRASKA",
    "ONT": "CALIFORNIA",
    "MCO": "奧蘭多",
    "OSH": "WISCONSIN",
    "OTM": "IOWA",
    "OXR": "CALIFORNIA",
    "PSP": "CALIFORNIA",
    "PFN": "FLORIDA",
    "PSC": "WASHINGTON",
    "PNS": "FLORIDA",
    "PIA": "ILLINOIS",
    "PHL": "費城",
    "PHX": "鳳凰城",
    "PIR": "SOUTH",
    "PIT": "匹菲堡",
    "PDX": "波特蘭,OREGON",
    "PWM": "MAINE",
    "SWF": "NEW",
    "PUB": "COLORADO",
    "PUW": "WASHINGTON",
    "RDU": "NORTH",
    "RAP": "SOUTH",
    "RDD": "CALIFORNIA",
    "RDM": "OREGON",
    "RNO": "NEVADA",
    "RIC": "VIRGINIA",
    "RIW": "WYOMING",
    "PVD": "RHODE",
    "UIN": "ILLINOIS",
    "ROA": "VIRGINIA",
    "RST": "MINNESOTA",
    "ROC": "NEW",
    "RFD": "ILLINOI",
    "RKS": "WYOMING",
    "SMF": "CALIFORNIA",
    "MBS": "MICHIGAN",
    "SAT": "聖安東尼",
    "SLC": "鹽湖城",
    "SJT": "TEXAS",
    "SAN": "CALIFORNIA",
    "SFO": "舊金山",
    "SJC": "聖荷西",
    "CSL": "CALIFORNIA",
    "SNA": "CALIFORNIA",
    "SBA": "CALIFORNIA",
    "SAF": "NEW",
    "SMX": "CALIFORNIA",
    "STS": "CALIFORNIA",
    "SRQ": "FLORIDA",
    "SAV": "GEORGIA",
    "BFF": "NEBRASKA",
    "AVP": "PENNSYLVANIA",
    "SEA": "西雅圖",
    "SHR": "WYOMING",
    "SHV": "LOUISIANA",
    "FSD": "SOUTH",
    "SBN": "INDIANA",
    "SPW": "IOWA",
    "SPI": "ILLINOIS",
    "SGF": "MISSOURI",
    "GEG": "WASHINGTON",
    "STL": "聖路易",
    "SCE": "PENNSYLVANIA",
    "SYR": "雪城",
    "QBF": "COLORADO",
    "VIS": "CALIFORNIA",
    "TLH": "FLORIDA",
    "TPA": "FLORIDA",
    "TEX": "COLORADO",
    "HUF": "INDIANA",
    "TXK": "ARKANSAS",
    "TOL": "OHIO",
    "TVC": "MICHIGAN",
    "TUS": "吐桑",
    "TUL": "OKLAHOMA",
    "TYR": "TEXAS",
    "ACT": "TEXAS",
    "ALO": "IOWA",
    "ATY": "SOUTH",
    "AUW": "WISCONSIN",
    "CWA": "WISCONSIN",
    "HPN": "NEW",
    "PBI": "FLORIDA",
    "ICT": "KANSAS",
    "SPS": "TEXAS",
    "ISN": "NORTH",
    "WRL": "WYOMING",
    "YKM": "WASHINGTON",
    "YKN": "SOUTH",
    "YNG": "OHIO",
    "YUM": "ARIZONA",
    "YBC": "貝克",
    "YBG": "波哥維",
    "YYC": "卡加立",
    "YCG": "卡司特雷加",
    "YYG": "沙絡特城",
    "YOD": "冷湖",
    "YQQ": "康英克斯",
    "YXC": "克藍布魯克",
    "YDF": "鹿湖",
    "YPR": "魯伯王子鎮",
    "YEA": "艾德頓",
    "YMM": "福麥木瑞",
    "YXJ": "福聖約翰",
    "YFC": "菲德里鎮",
    "YQX": "甘德",
    "YGP": "加斯佩",
    "YQU": "格蘭伯瑞爾",
    "YYR": "鵝灣",
    "YHZ": "哈利法克斯",
    "YKA": "康露市",
    "YLW": "卡洛那",
    "YQL": "雷絲橋",
    "YLL": "羅明斯特",
    "YXU": "倫頓",
    "YXH": "麥迪森漢",
    "YQM": "蒙克通",
    "YYY": "蒙特朱利",
    "YMQ": "蒙特利爾(蒙特婁)",
    "YBL": "原貝爾河",
    "YCD": "娜娜莫",
    "YYB": "北灣市",
    "YXS": "喬治王子鎮",
    "YQB": "魁北克",
    "YQR": "瑞吉娜",
    "YSJ": "聖約翰",
    "YAM": "所聖瑪利",
    "YXE": "撒司卡通",
    "YYD": "使密得斯",
    "YYT": "聖約翰斯",
    "YSL": "聖隆那",
    "YSB": "蘇布瑞",
    "YQY": "希梨",
    "YXT": "德瑞司",
    "YQT": "雷灣市",
    "YTS": "丁敏市",
    "YYZ": "多倫多",
    "YTO": "多倫多",
    "YVO": "瓦多爾",
    "YVR": "溫哥華",
    "YYJ": "維多利亞",
    "YWK": "瓦布希",
    "YQG": "溫莎",
    "YWG": "溫尼伯",
    "YQI": "亞茅斯",
    "YZF": "黃刀鎮",
    "ABZ": "雅柏丁",
    "AMS": "阿姆斯特丹",
    "ATH": "雅典",
    "BUH": "ROMANIA",
    "BUD": "HUNGARY",
    "BCN": "巴塞隆納",
    "BFS": "比薩",
    "BEG": "YUGOSLAVIA",
    "BGO": "NORWAY",
    "TXL": "柏林",
    "BLQ": "ITALY",
    "BNJ": "波昂",
    "BRS": "布理斯托",
    "BRU": "布魯塞爾",
    "BUH": "布加勒斯特",
    "BUD": "布達佩斯",
    "CWL": "卡地夫",
    "CGN": "科隆",
    "CPH": "哥本哈根",
    "DUB": "都伯林",
    "DUS": "杜塞道夫",
    "EDI": "愛丁堡",
    "FAO": "PORTUGAL",
    "FRA": "法蘭克福",
    "GOA": "ITALY",
    "GVA": "日內瓦",
    "GIB": "直布羅陀",
    "GLA": "格拉斯哥",
    "GOT": "SWEDEN",
    "GRZ": "AUSTRIA",
    "HAM": "漢堡",
    "HAJ": "GERMANY",
    "HUY": "(英國)",
    "LHR": "倫敦",
    "HEL": "赫爾新基",
    "INN": "AUSTRIA",
    "IST": "伊斯坦堡",
    "IEV": "UKRAINE",
    "KLU": "AUSTRIA",
    "KBP": "UKRAINE",
    "KRK": "POLAND",
    "LBA": "里茲",
    "LNZ": "AUSTRIA",
    "LIS": "里斯本",
    "LGW": "倫敦",
    "LJU": "SLOVENIA",
    "LYS": "FRANCE",
    "MAD": "馬德里",
    "AGP": "SPAIN",
    "MAN": "曼徹斯特",
    "MRS": "FRANCE",
    "MOW": "RUSSIAN",
    "MPL": "FRANCE",
    "MUC": "慕尼黑",
    "MXP": "米蘭ITALY",
    "LIN": "米蘭ITALY",
    "NAP": "NAPLES",
    "NCL": "新堡",
    "NCE": "尼斯",
    "NWI": "挪利其",
    "ODS": "UKRAINE",
    "OSL": "奧斯陸",
    "CDG": "巴黎",
    "ORY": "巴黎",
    "PRG": "布拉格",
    "RIX": "LATVIA",
    "FCO": "羅馬ITALY",
    "SZG": "AUSTRIA",
    "SNN": "善隆",
    "SOF": "BULGARIA",
    "SPU": "克羅埃西亞",
    "STO": "斯維哥爾摩",
    "LED": "RUSSIAN",
    "STR": "司徒加特",
    "TLL": "ESTONIA",
    "MME": "英國",
    "TSR": "ROMANIA",
    "TLS": "FRANCE",
    "VRN": "ITALY",
    "VCE": "威尼斯ITALY",
    "VIE": "維也納",
    "VNO": "LITHUANIA",
    "WAW": "POLAND",
    "WRO": "POLAND",
    "ZAG": "克羅埃西亞",
    "ZRH": "蘇黎世",
    "AKL": "奧克蘭",
    "BNE": "布里斯本",
    "CNS": "凱恩斯",
    "CBR": "坎培拉",
    "CHC": "基督城",
    "DRW": "達爾文",
    "HBA": "荷巴特",
    "MEL": "墨爾本",
    "MIM": "AUSTRALIA",
    "NAN": "南地",
    "NOU": "努美亞",
    "PPG": "巴哥巴哥",
    "PPT": "大溪地",
    "PER": "伯斯",
    "POM": "摩勒斯比港",
    "WLG": "威靈頓",
    "SUV": "蘇瓦",
    "SYD": "雪梨",
    "ACA": "亞加普科",
    "ASU": "亞松森",
    "BOG": "波哥大",
    "BUE": "布宜諾斯艾利斯",
    "BSB": "巴西利亞",
    "BGI": "橋鎮",
    "CCS": "加拉加斯",
    "CAY": "開雪",
    "GRG": "喬治市",
    "GUA": "瓜地馬拉市",
    "HAV": "哈瓦那",
    "KIN": "京士頓",
    "LPB": "拉巴斯",
    "LIM": "利馬",
    "MGA": "馬拿瓜",
    "MAO": "瑪瑙斯",
    "MAY": "BAHAMAS",
    "MEX": "墨西哥",
    "MVD": "蒙地維多",
    "MBJ": "蒙特哥灣",
    "PTY": "巴拿馬",
    "PBM": "巴拉馬利波",
    "PAP": "太子港",
    "POS": "西班牙港",
    "UIO": "基多",
    "REL": "雷雪夫",
    "RIO": "里約熱內盧",
    "SJO": "聖約瑟",
    "SJU": "聖胡安",
    "SAO": "聖保羅",
    "SAL": "聖薩爾多",
    "SCL": "聖地牙哥",
    "SDQ": "聖多明哥",
    "TGU": "德古斯加巴",
    "ACA": "MEXICO",
    "ABD": "阿巴丹",
    "ABJ": "阿必尚",
    "AUH": "UNITED",
    "ABV": "NIGERIA",
    "ACC": "阿克拉",
    "ADD": "阿迪斯阿魯巴",
    "ADE": "亞丁",
    "ALG": "阿爾及爾",
    "AMM": "安曼",
    "ANK": "安卡拉",
    "BGW": "巴格達",
    "BAH": "巴林",
    "BKO": "巴馬科",
    "BGF": "班基",
    "BEY": "貝魯特",
    "BLZ": "布蘭太",
    "BZV": "布拉薩市",
    "CAI": "開羅",
    "CPT": "開普敦",
    "CAS": "卡薩馬達卡",
    "CKY": "柯那克里",
    "COO": "柯多努",
    "DKR": "達卡",
    "DAM": "大馬士革",
    "DAR": "達萊撤蘭",
    "DHA": "達蘭",
    "DOH": "杜哈",
    "DXB": "杜拜",
    "DWC": "杜拜",
    "EBB": "恩特比/坎帕拉",
    "FTL": "拉米堡",
    "FNA": "自由城",
    "HRE": "ZIMBABWE",
    "ISL": "伊斯坦堡",
    "JED": "吉達",
    "JNB": "約翰尼斯堡",
    "KRT": "卡土穆",
    "FIA": "金夏沙",
    "KWI": "科威特",
    "LOS": "拉哥斯",
    "LPA": "拉斯巴馬斯",
    "LBV": "自由府",
    "LLW": "里郎威",
    "LFW": "洛梅",
    "LUM": "魯倫素馬凱斯",
    "LAD": "盧安達",
    "LUN": "路沙卡",
    "MLA": "馬爾他",
    "MTS": "馬基尼",
    "MSU": "馬基魯",
    "MRU": "模里西斯",
    "MGQ": "摩加迪休",
    "MLW": "濛羅維亞",
    "MCT": "馬斯開特",
    "NBO": "奈洛比",
    "NDJ": "恩將納",
    "NIM": "尼阿美",
    "OUA": "瓦加杜古",
    "WDH": "溫厘克",
    "RAK": "MOROCCO",
    "RUH": "利雅德",
    "SAY": "索斯柏里",
    "SEC": "FRANCE",
    "TNG": "MOROCCO",
    "TNR": "塔娜娜刺綿",
    "THR": "德黑蘭",
    "TLV": "特拉維夫",
    "TIP": "的黎波里",
    "TUN": "突尼斯",
    "YAO": "雅恩德",
    "TAE": "大邱",
    "PVG": "上海浦東",
    "KKJ": "福岡",
    "MEM": "孟斐斯",
    "GYD": "巴庫",
    "LUX": "盧森堡",
    "ROR": "帛琉",
    "SVO": "莫斯科",
    "KJA": "克拉斯諾亞爾斯克",
    "DAD": "峴港",
    "OVB": "新西伯利亞",
    "VII": "榮市",
    "VCA": "芹苴",
    "CXR": "金蘭",
    "VDO": "下龍",
    "UUS": "南薩哈林斯克",
    "TAS": "塔什干",
    "ONT": "安大略", //加州
    "WAW": "華沙",
};

const logError = require('./logError');

function lookup(iata) {
    const res = dict[iata];
    if (res) {
        if (res.match(/^[A-Z]/)) {
            logError({msg: "airport not translated", val: iata, tr: res});
        }
        return res;
    } else {
        logError({msg: "airport not found", val: iata});
        return iata;
    }
}

module.exports = function(iata) {
    return iata.toUpperCase().split('|').map(lookup).join('/');
};
