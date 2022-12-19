// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalConfig: any = {
  XY: {
    signUrl: "/api-gateway/jpaas-jags-server/interface/createsign",
    gateUrl: "/api-gateway/jpaas-jags-server/interface/gateway.do",
    userUrl: "/jmportalgft/interfaces/getUserInfoByTicket.do",
    tokenUrl: "/jxtyyh/interfaces/jis/getTicket.do",

    eval: {
      appCode: "xysyjs",
      appName: "新余市一件事",
      appRegCode: "360500000000",
      appRegName: "江西省新余市",
      abilityCode: "0272a09bed4140f2844579aacf01ef4f",
      organCode: "6d274a20dfb249bf98aaf6da8e54c9f9",
    },
    appid: "xyystbzqrikov",
    cover: require("@/static/img/xy.jpg"),
    provider: "本服务由新余市政务服务中心提供",
  },
  FY: {
    userUrl: "/jmportalgft/interfaces/getUserInfoByTicket.do",
    tokenUrl: "/jxtyyh/interfaces/jis/getTicket.do",
    signUrl: "/api-gateway/jpaas-jags-server/interface/createsign",
    gateUrl: "/api-gateway/jpaas-jags-server/interface/gateway.do",
    api: ["gjuhidiuwqhuhbj", "hqywsbxx", "fyxlphqqyxx", "wjsc"],
    eval: {
      appCode: "fyxyjsycb",
      appName: "分宜县一件事一次办",
      appRegCode: "360500000000",
      appRegName: "江西省分宜县",
      abilityCode: "0272a09bed4140f2844579aacf01ef4f",
      organCode: "1285d0ad24a04cffbb3142bb4ab68dba",
    },
    appid: "fyxyjsycbirfie",
    provider: "本服务由分宜县政务服务中心提供",
    cover: require("@/static/img/fy.jpg"),
  },
  XNH: {
    signUrl: "/api-gateway/jpaas-jags-server/interface/createsign",
    gateUrl: "/api-gateway/jpaas-jags-server/interface/gateway.do",
    userUrl: "/jmportalgft/interfaces/getUserInfoByTicket.do",
    tokenUrl: "/jxtyyh/interfaces/jis/getTicket.do",

    eval: {
      appCode: "xnhqyjsycb",
      appName: "仙女湖区一件事一次办",
      appRegCode: "360503000000",
      appRegName: "江西省仙女湖区",
      abilityCode: "0272a09bed4140f2844579aacf01ef4f",
      organCode: "9952db958ac041e298654947e30dea7e",
    },
    appid: "xnhqystbodvhh",
    provider: "本服务由仙女湖区政务服务中心提供",
    cover: require("@/static/img/xnh.jpg"),
  },
  YS: {
    signUrl: "/api-gateway/jpaas-jags-server/interface/createsign",
    gateUrl: "/api-gateway/jpaas-jags-server/interface/gateway.do",
    userUrl: "/jmportalgft/interfaces/getUserInfoByTicket.do",
    tokenUrl: "/jxtyyh/interfaces/jis/getTicket.do",

    eval: {
      appCode: "ysqyjsycb",
      appName: "渝水区一件事一次办",
      appRegCode: "360502000000",
      appRegName: "江西省渝水区",
      abilityCode: "0272a09bed4140f2844579aacf01ef4f",
      organCode: "c097f20ca0dd4ce0bdd65fbec2a2591b",
    },
    appid: "ysqystbytkoj",
    provider: "本服务由渝水区政务服务中心提供",
    cover: require("@/static/img/fy.jpg"),
  },
};

export default globalConfig;