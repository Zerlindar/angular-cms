/**
 * Created by Administrator on 2016/12/15.
 */
app.factory("selectApi", function(){
  var obj = {};
  obj.$listData = [
    {
      'id': '1', // 操作id
      'tag_id': '1', // 0和非0，0为本地标签，非0为已同步至微信侧
      'name': '星标组', // 标签名称
      'count': '0', // 成员数量
    },
    {
      'id': '1', // 操作id
      'tag_id': '2', // 0和非0，0为本地标签，非0为已同步至微信侧
      'name': '90hou ', // 标签名称
      'count': '52', // 成员数量
    },
    {
      'id': '1', // 操作id
      'tag_id': '3', // 0和非0，0为本地标签，非0为已同步至微信侧
      'name': '小区111', // 标签名称
      'count': '10', // 成员数量
    }
  ]
  return obj;
})
app.factory("launchApi", function () {
  var obj = {};
  obj.$listTitle = [
    {name: "checkbox"},
    {name: "昵称", field: "nickname"},
    {name: "性别", field: "sex"},
    {name: "提交时间", field: "subscribe_time"},
    {name: "语言", field: "language"},
    {name: "国家", field: "country"}
  ];
  obj.$listData = [{
    "id": "1",
    "openid": "65534f32265f71d49fd734c9fc603c0f194859c0501c96533a4b409318e3d97e",
    "nickname": "Darren",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "",
    "province": "",
    "country": "\u4e39\u9ea6",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/icBWnfdvEwTgfW5l8JVcntic7l2QKicD54F2ZjXOiaNro1ndAyVic0NKf5oTzJLQrrWP8uybicVHdEcicIVL8tpQBKB5Me15O4yk6Ne\/0",
    "subscribe_time": "2014-01-05 21:24:54",
    "bind_card": "0",
    "tag_list": ["1"]
  }, {
    "id": "2",
    "openid": "fde93f329e7d6896665efe13b61223b9623e61d76c03626102e0626c529ad279",
    "nickname": "\u6768\u5f66\u4e2d \u5317\u4eac\u671d\u9633\u4ee3\u7406\u554613501274176",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "",
    "province": "",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/icBWnfdvEwTgfW5l8JVcnt3M2RbRtUV6BIMwWBwdNQN32SCoyQxicGm6NvSSOc1WPkxDnStGOPfjGkm3lJnicMUibzMa9nRF3Nfn\/0",
    "subscribe_time": "2014-11-23 14:41:52",
    "bind_card": "0",
    "tag_list": ["1"]
  }, {
    "id": "3",
    "openid": "26d17bf75436717f821a41879449c04a297e15e7112fde73b2a637e10630feba",
    "nickname": "\u5b87\u5b99\u98de\u8239",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u671d\u9633",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/icBWnfdvEwTgfW5l8JVcntwShPG8mcTDeMvD9x9hiaiar9d5aolswVn4EVoK9DP1HPwXiaUtPWicwqPtedmqIWX64DlZJS5R6gL4h\/0",
    "subscribe_time": "2014-01-05 21:43:29",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "4",
    "openid": "68221c0902ed5ec1b4652e3125d65d16e0b720ff80695d42d431d74bb3959025",
    "nickname": "\u59da\u8fdc",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u897f\u57ce",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/oFoibaRjCMKdDWiaicYgsE80GYL03kL0ribZgd76G6ibE1pWa5MMmpYhUgdoUQltl4ysCChibsdEY1zl2fXdOoRh8cXH6WovzBQDNg\/0",
    "subscribe_time": "2014-01-07 15:17:30",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "5",
    "openid": "fafa31c7c23e890c54adc385e915b70892174f06e4b7403cfea1a66e5b81430c",
    "nickname": "\u5434\u5ce5",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u4e1c\u57ce",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/pg8u7Vk7mObzJ3w1LjqaBqj83ibcKibmSdDK4UMz8Vrdx9D2jiaMz2HqtIJ9VTAf6F1chria2SIYZ1mdTF6mbfwfzuoEPIcibeFLic\/0",
    "subscribe_time": "2014-01-07 10:10:13",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "6",
    "openid": "35087456fff6648befedc1a15b348cb9545c06fe415eca82f67ce5d19a2bbd2b",
    "nickname": "\u8d75\u9e4f\u7a0b",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u4e30\u53f0",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/PiajxSqBRaEJyh30RbLxia6SqZicp0Y45Uf1oXPluSwkGxqsnyWyjUrtSbtEEcK8qiaL8ia1U1oBqibV3rtpSw059ysg\/0",
    "subscribe_time": "2014-02-28 20:16:28",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "7",
    "openid": "5ae3d478261349af4b09206f6b58885cf8252832e9b9fe9add581ddb9fa1f5a8",
    "nickname": "\u51b0",
    "sex": "\u5973",
    "language": "zh_CN",
    "city": "\u897f\u57ce",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/pg8u7Vk7mObzJ3w1LjqaBk5Vybic7ufXx2Vx1TdeZBRRbkP8aPddgGVzicaXKIxg9Tj54jZj0m7wlv32VPyoIEcLrz9te60K8o\/0",
    "subscribe_time": "2014-01-09 10:52:34",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "8",
    "openid": "4d019f089322480bd3d6a989443b868c681adec71aad9996e7a94b60fe8c3139",
    "nickname": "\u5929\u771f\u7eff\u554a \u6811\u771f\u84dd",
    "sex": "\u5973",
    "language": "zh_CN",
    "city": "\u4e30\u53f0",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/ajNVdqHZLLDcAnukZ6CCvNabuEmiaWW62zJCicC76CSTm7utr6PqrP3Gb1A1uljYdbLC9HHMbQAFibf86KKBzXOog\/0",
    "subscribe_time": "2014-01-10 02:40:41",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "9",
    "openid": "340573cebdd74cc4b65499656226e97a52167c65786b71cb1bcf19ca607e649f",
    "nickname": "\u767d\u7389",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u6d77\u6dc0",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/OU2rqvx645u3pnYNBEtOZI7xibsdUS4LXAkOo5WxN6K38yaEtkLTqoAiajibwMReNW2ia7tYf7Zv3KZSwSpcMtGd5rQFMl4wqrWf\/0",
    "subscribe_time": "2014-05-01 06:12:16",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "10",
    "openid": "ec661a5ee8249db0ec6d60847055486a9f6e58fbbf0b44c54efbe417d419f162",
    "nickname": "\u5317\u4eac\u9ec4\u6c0f\u65d7\u4e0b\u4e94\u91d1\u9500\u552e\u90e8",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u6cc9\u5dde",
    "province": "\u798f\u5efa",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/Q3auHgzwzM5sPAewCb4Gr4yC3LqTiaKm1OOCHjXXsic1nCbY85ico6eLorI7OhXEGhiapEXRsXmxwDC0J2jy6b8Kiag\/0",
    "subscribe_time": "2014-01-15 15:54:26",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "11",
    "openid": "3ba1d1b0678bbb156c8f2ec0d29d11a636a8c07d328092b6af40da2a29846abc",
    "nickname": "\u7a7a\u8c37\u5e7d\u5170",
    "sex": "\u5973",
    "language": "zh_CN",
    "city": "\u6d77\u6dc0",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/icBWnfdvEwTgfW5l8JVcnt433dPJamtfAuSpbvfibEbmW1hKL3u7huuhvBA9O6XfQloHv78gGgbianjWTVdiciaGsA1wHSyYtMcEH\/0",
    "subscribe_time": "2014-02-28 20:16:28",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "12",
    "openid": "ccb537c45e9c27e34c3f99d05f6b70f5f9a8d32f1eac45145015972ea3d02d8c",
    "nickname": "\u859b\u9e4f",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "",
    "province": "",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/PiajxSqBRaELD1M14oUiaxU23zT4Lic3z3LnpM3rU02SgV8l3ULHlxwgWXbo9u0B3bnKUSXK4E8AlBUP00gsuPzLQ\/0",
    "subscribe_time": "2015-10-16 23:25:33",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "13",
    "openid": "288c318e2d054f85b47e0375186ffb1bb1a760fdcd4dd2de4d6b716abe9058ac",
    "nickname": "\u82cf",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u77f3\u666f\u5c71",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/ajNVdqHZLLCibsicpLEWtsuoEvdXppP5W7p6Ifzs1QhYxo7iaLsxZ7DySDLlfMquxaQ8duibnVYBFlFNhZppeibbIlQ\/0",
    "subscribe_time": "2014-01-06 08:26:53",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "14",
    "openid": "447aed42ff61127f0b0f501a76ba1acbffc55aed57ad7780cf5bd648f68cafab",
    "nickname": "\u60e0\u4eba",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "",
    "province": "",
    "country": "\u65af\u6d1b\u6587\u5c3c\u4e9a",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/ECCBojzbwGtKELJ6bz17xaCsTu6T5gAgtmJmnsgEBdNhL2yo8oXgicoH2vaATxp2eqjvPJSibY2Vqs6AyyCdlfU3jg41CMOQpe\/0",
    "subscribe_time": "2014-01-06 16:17:34",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "15",
    "openid": "12eca33833e712e303463b0b03b39e56bd6ac8638b39de2085320bac686eb149",
    "nickname": "????WAN????",
    "sex": "\u5973",
    "language": "zh_CN",
    "city": "\u671d\u9633",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/ajNVdqHZLLCcnxiaO9XRibNYQ6H9dpdqlcHZx4HnZVodH9oan0kTfTr7l2cEvv5icu7rB09JPtUD8MW94P7KQZQicA\/0",
    "subscribe_time": "2014-01-07 19:12:12",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "16",
    "openid": "ccb4aa5b10ba1e859ec85d9da1daa2da288d3c0554cd3c345850a05b3777455f",
    "nickname": "\u9a6c\u541b",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u897f\u57ce",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/pg8u7Vk7mObzJ3w1LjqaBlgGsItPNAaDve63pPkAcD77mbgjaS511ibl8Ku2OZxLhicBMQDRm5HZbV26Zsn6Pke682bicNXnKkq\/0",
    "subscribe_time": "2015-06-10 10:26:13",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "17",
    "openid": "4071e37256361364a9016c8ee2462e037d7431667d156ccbda237fb4fba92ae1",
    "nickname": "Robin",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u901a\u5dde",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/pg8u7Vk7mObzJ3w1LjqaBpkLQ9kmdaC7tRWtcAP5MhoC8XKAwVPL69Ipfncic9kVvQSswAurj772rQYmgbcNTPOhAby6IZYon\/0",
    "subscribe_time": "2014-01-08 11:47:31",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "18",
    "openid": "4da5a444eb940b36b6e2cac35d50cf08384d0424069282800685eb84be9f47c4",
    "nickname": "\u7530\u534e\u575a",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u5bc6\u4e91",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/OU2rqvx645slYj4icRiavKlz402ypShflFWx02micphu5VqMR4lYZiaarZibAkIDlZszotyIibsEIFHaibCgePWOxg60A\/0",
    "subscribe_time": "2014-02-28 20:16:28",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "19",
    "openid": "45204fc2a7d46b0cedc867f99fadcd7f171421452b81522b4b2f87bbd96f481e",
    "nickname": "\u6c5f\u519b\u9752",
    "sex": "\u7537",
    "language": "zh_CN",
    "city": "\u671d\u9633",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/ajNVdqHZLLCzE6fdPnxZ0cQZiafp15KoNa8qV8IGbZAn1rjTbUTNZZ4esnncFSMLYrWT6HOlIs5a2JDw2GOAs6A\/0",
    "subscribe_time": "2014-04-28 12:54:08",
    "bind_card": "0",
    "tag_list": []
  }, {
    "id": "20",
    "openid": "36cf890c61b89a742b17879fb3db51194d66246a1b4a678b1cd8c15770b54d81",
    "nickname": "\u771f\u5fc3\u771f\u610f",
    "sex": "\u5973",
    "language": "zh_CN",
    "city": "",
    "province": "\u5317\u4eac",
    "country": "\u4e2d\u56fd",
    "headimgurl": "http:\/\/wx.qlogo.cn\/mmopen\/OU2rqvx645u3pnYNBEtOZJDkKTKEFFibFfpahKj1l2PNibvWVhLxK3ucOp7jlnzD68s0AjdH2JJW8WQnznUia6dxW6nNYE0Lddc\/0",
    "subscribe_time": "2014-01-22 23:34:48",
    "bind_card": "0",
    "tag_list": []
  }];
  return obj;
});