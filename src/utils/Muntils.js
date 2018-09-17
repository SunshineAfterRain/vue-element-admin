/* eslint-disable */
export default {
    //浏览器判断
    isIE: navigator.userAgent.indexOf("MSIE") == -1 ? false: true,
    isOPER: navigator.userAgent.indexOf("Opera") == -1 ? false: true,
    version: navigator.appVersion.split(";"),
    isIE6: !window.XMLHttpRequest,
    isXHTML: document.compatMode == "CSS1Compat" ? true: false,
    //获取cookie
    getAdCookie: function(N) {
        var c = document.cookie.split("; ");
        for (var i = 0; i < c.length; i++) {
            var d = c[i].split("=");
            if (d[0] == N) return unescape(d[1]);
        }
        return "";
    },
    //设置cookie
    setAdCookie: function(N, V, Q, D) {
        var L = new Date();
        var z = new Date(L.getTime() + Q * 60000);
        var tmpdomain = D;

        document.cookie = N + "=" + escape(V) + ";path=/;" + tmpdomain + "expires=" + z.toGMTString() + ";";
    },

    // 把字符转换为 HTML 实体
    escapeHTML: function(a) {
        return a.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;").replace(/ /g, "&nbsp;").replace(/"/g, "&#34;").replace(/'/g, "&#39;")
    },

    //日期判断函数
    compareDate: function(type, d) {
        try {
            var dateArr = d.split("-");
            var checkDate = new Date();
            checkDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
            var now = new Date();
            var nowTime = now.getTime();
            var checkTime = checkDate.getTime();
            if (type == "after") {
                if (nowTime >= checkTime) {
                    return true;
                } else {
                    return false;
                }
            } else if (type == "before") {
                if (nowTime <= checkTime) {
                    return true;
                } else {
                    return false;
                }
            }
        } catch(e) {
            return false;
        }
    },
    //获取时间对象
    strToDateFormat: function(str, ext) {
        var arys = new Array();
        arys = str.split('-');
        var newDate = new Date(arys[0], arys[1] - 1, arys[2], arys[3], 0, 0);
        if (ext) {
            newDate = new Date(newDate.getTime() + 1000 * 60 * 60 * 24);
        }
        return newDate;
    },
    // 获取domain
    getDoamin: function(url) {
        return url.match(/([http|https]+:\/\/)?(([0-9a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D-]+[.]{1})+[a-zA-Z-]+)/i);
    },
    // 去除两边空格
    trim: function(str) {
        return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") // 其中 \uFEFF utf-8的字节序标记，防止有 bom头，而 \xA0 是 不换行空格，通常所说的 nbsp \s 包括全角空格
    },
    // 去除字符左边的空格
    ltrim: function(str) {
        return str.replace(/^[\s\uFEFF\xA0]/g, "")
    },
    // 去除字符右边的空格
    rtrim: function(str) {
        return str.replace(/([\s\uFEFF\xA0]$)/g, "")
    },
    // 替换字符中的空格
    allTrim: function(str) {
        var whitespace = "[\\x20\\t\\r\\n\\f]"; // 因为是双括号，所以要使用 \ 转义字符转义 \x20是空格
        var regExp = new RegExp(whitespace, 'gi'); // RegExp 式的正则表达式
        return str.replace(regExp, '');
    },
    /**
     匹配中文字符
     
     普遍使用的正则是[\u4e00-\u9fa5]，但这个范围并不完整。例如：
     /[\u4e00-\u9fa5]/.test( '⻏' ) // 测试部首⻏，返回false
     根据Unicode 5.0版编码，要准确的判断一个中文字符要包括：
     范围     含义     范围     含义
     2E80-2EFF     CJK 部首补充     2F00-2FDF     康熙字典部首
     3000-303F     CJK 符号和标点     31C0-31EF     CJK 笔画
     3200-32FF     封闭式 CJK 文字和月份     3300-33FF     CJK 兼容
     3400-4DBF     CJK 统一表意符号扩展 A     4DC0-4DFF     易经六十四卦符号
     4E00-9FBF     CJK 统一表意符号     F900-FAFF     CJK 兼容象形文字
     FE30-FE4F     CJK 兼容形式     FF00-FFEF     全角ASCII、全角标点
     因此，正确的匹配中文字符正则表达式为：
     var rcjk = /[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]+/g;
     如果不希望匹配标点、符号，在正则中去掉对应的范围即可：
     3000-303F     CJK 符号和标点     FF00-FFEF     全角ASCII、全角标点
     */
    // 检测字符串是否是中文
    isChinese: function(str) {
        var rcjk = /[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]+/g;
        return rcjk.test(str);
    },
    /**
     * 
     * 先介绍下Email的规则：local-part@domain
     local-part最长64，domain最长253，总长最长256
     local-part可以使用任意ASCII字符：
     大小写英文字母 a-z,A-Z
     数字 0-9
     字符 !#$%&'*+-/=?^_`{|}~
     字符 .不能是第一个和最后一个，不能连续出现两次
     但是有些邮件服务器会拒绝包含有特殊字符的邮件地址
     domain（域名）仅限于26个英文字母、10个数字、连词号-
     连词号-不能是第一个字符
     顶级域名（com、cn等）长度为2到6个
     * */

    // 检测是不是正确的email格式
    isEmail: function(str) {
        return /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i.test(str);
    },
    // 检测是否是正确的手机号码
    isMobilePhone: function(str) {
        return /^1[3|4|5|7|8]\d{9}$/.test(str)
    },
    // 检测是不是合法身份证
    checkID: function(id) {
        if (ID.length == 15) {
            // 升级为18位
            ID = ID.substr(0, 6) + "19" + ID.substr(6);
            // 前17位对应的系数
            var rank = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"];
            // 前17为加权除以17后的余数对应的最后一位身份证号码
            var last = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
            // 加权和
            for (var i = 0,
            sum = 0,
            len = ID.length; i < len; i++) sum += ID[i] * rank[i];
            // 加上最后一位
            ID += last[sum % 11];
        }
        if (ID.length != 18) return null;

        var match = rid.exec(ID);
        return match ? {
            ID: ID,
            area: match[1],
            y: match[2],
            m: match[3],
            d: match[4],
            sex: match[5] % 2
        }: null;
    },

    date: function(format, timestamp, days) {
        var a, jsdate = ((timestamp) ? new Date(timestamp * 1000) : new Date());

        if (days) {
            jsdate.setDate(jsdate.getDate() + days);
        }

        var pad = function(n, c) {
            if ((n = n + "").length < c) {
                return new Array(++c - n.length).join("0") + n;
            } else {
                return n;
            }
        };
        var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var txt_ordin = {
            1 : "st",
            2 : "nd",
            3 : "rd",
            21 : "st",
            22 : "nd",
            23 : "rd",
            31 : "st"
        };
        var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var f = {
            // Day 
            d: function() {
                return pad(f.j(), 2)
            },
            D: function() {
                return f.l().substr(0, 3)
            },
            j: function() {
                return jsdate.getDate()
            },
            l: function() {
                return txt_weekdays[f.w()]
            },
            N: function() {
                return f.w() + 1
            },
            S: function() {
                return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
            },
            w: function() {
                return jsdate.getDay()
            },
            z: function() {
                return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
            },

            // Week 
            W: function() {
                var a = f.z(),
                b = 364 + f.L() - a;
                var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
                if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
                    return 1;
                } else {
                    if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
                        nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                        return date("W", Math.round(nd2.getTime() / 1000));
                    } else {
                        return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                    }
                }
            },

            // Month 
            F: function() {
                return txt_months[f.n()]
            },
            m: function() {
                return pad(f.n(), 2)
            },
            M: function() {
                return f.F().substr(0, 3)
            },
            n: function() {
                return jsdate.getMonth() + 1
            },
            t: function() {
                var n;
                if ((n = jsdate.getMonth() + 1) == 2) {
                    return 28 + f.L();
                } else {
                    if (n & 1 && n < 8 || !(n & 1) && n > 7) {
                        return 31;
                    } else {
                        return 30;
                    }
                }
            },

            // Year 
            L: function() {
                var y = f.Y();
                return (! (y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
            },
            //o not supported yet 
            Y: function() {
                return jsdate.getFullYear()
            },
            y: function() {
                return (jsdate.getFullYear() + "").slice(2)
            },

            // Time 
            a: function() {
                return jsdate.getHours() > 11 ? "pm": "am"
            },
            A: function() {
                return f.a().toUpperCase()
            },
            B: function() {
                // peter paul koch: 
                var off = (jsdate.getTimezoneOffset() + 60) * 60;
                var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
                var beat = Math.floor(theSeconds / 86.4);
                if (beat > 1000) beat -= 1000;
                if (beat < 0) beat += 1000;
                if ((String(beat)).length == 1) beat = "00" + beat;
                if ((String(beat)).length == 2) beat = "0" + beat;
                return beat;
            },
            g: function() {
                return jsdate.getHours() % 12 || 12
            },
            G: function() {
                return jsdate.getHours()
            },
            h: function() {
                return pad(f.g(), 2)
            },
            H: function() {
                return pad(jsdate.getHours(), 2)
            },
            i: function() {
                return pad(jsdate.getMinutes(), 2)
            },
            s: function() {
                return pad(jsdate.getSeconds(), 2)
            },
            //u not supported yet 
            // Timezone 
            //e not supported yet 
            //I not supported yet 
            O: function() {
                var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
                if (jsdate.getTimezoneOffset() > 0) t = "-" + t;
                else t = "+" + t;
                return t;
            },
            P: function() {
                var O = f.O();
                return (O.substr(0, 3) + ":" + O.substr(3, 2))
            },
            //T not supported yet 
            //Z not supported yet 
            // Full Date/Time 
            c: function() {
                return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
            },
            //r not supported yet 
            U: function() {
                return Math.round(jsdate.getTime() / 1000)
            }
        };

        return format.replace(/[\\]?([a-zA-Z])/g,
        function(t, s) {
            if (t != s) {
                // escaped 
                ret = s;
            } else if (f[s]) {
                // a date function exists 
                ret = f[s]();
            } else {
                // nothing special 
                ret = s;
            }
            return ret;
        });
    },

    md5: function(string) {

        function RotateLeft(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }

        function AddUnsigned(lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }

        function F(x, y, z) {
            return (x & y) | ((~x) & z);
        }
        function G(x, y, z) {
            return (x & z) | (y & (~z));
        }
        function H(x, y, z) {
            return (x ^ y ^ z);
        }
        function I(x, y, z) {
            return (y ^ (x | (~z)));
        }

        function FF(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function GG(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function HH(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function II(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };

        function ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1 = lMessageLength + 8;
            var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            var lWordArray = Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        };

        function WordToHex(lValue) {
            var WordToHexValue = "",
            WordToHexValue_temp = "",
            lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
            }
            return WordToHexValue;
        };

        function Utf8Encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        };

        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22;
        var S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20;
        var S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23;
        var S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;

        string = Utf8Encode(string);

        x = ConvertToWordArray(string);

        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;

        for (k = 0; k < x.length; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = AddUnsigned(a, AA);
            b = AddUnsigned(b, BB);
            c = AddUnsigned(c, CC);
            d = AddUnsigned(d, DD);
        }

        var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

        return temp.toLowerCase();
    },
    
    check_pwd:function (pass,len) {
        if (pass.length < len) {
            return 0;
        }
        var ls = 0;
        if (pass.match(/([a-z])+/)) {
            ls++;
        }
        if (pass.match(/([0-9])+/)) {
            ls++;
        }
        if (pass.match(/([A-Z])+/)) {
            ls++;
        }
        if (pass.match(/[^a-zA-Z0-9]+/)) {
            ls++;
        }
        return ls
    }
};

