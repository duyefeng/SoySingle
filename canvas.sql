/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50709
Source Host           : localhost:3306
Source Database       : canvas

Target Server Type    : MYSQL
Target Server Version : 50709
File Encoding         : 65001

Date: 2017-01-01 14:26:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for node_articles_comment
-- ----------------------------
DROP TABLE IF EXISTS `node_articles_comment`;
CREATE TABLE `node_articles_comment` (
  `cid` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论唯一标识符',
  `name` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` varchar(20) NOT NULL,
  `aid` int(10) NOT NULL COMMENT '文章id',
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of node_articles_comment
-- ----------------------------
INSERT INTO `node_articles_comment` VALUES ('1', '1', '我喜欢这篇<div>但是好吵啊</div>', '1479205900', '2');
INSERT INTO `node_articles_comment` VALUES ('2', '1', '好啊好啊', '1479205933', '1');
INSERT INTO `node_articles_comment` VALUES ('3', '1', '这篇不好', '1479205922', '3');
INSERT INTO `node_articles_comment` VALUES ('4', 'name', '我也喜欢这篇', '1479205989', '1');
INSERT INTO `node_articles_comment` VALUES ('11', '紫苑紫苑`', '哈哈哈，写的挺好的。楼主加油', '1480931127', '1');
INSERT INTO `node_articles_comment` VALUES ('10', '紫苑紫苑`', '我要去学校,天天不迟到<div>老师说，早早早，你为什么不去炸学校！</div>', '1480931097', '2');
INSERT INTO `node_articles_comment` VALUES ('12', '紫苑紫苑`', '谁说的，我就觉得挺好的，哈哈。', '1480931389', '3');
INSERT INTO `node_articles_comment` VALUES ('13', '紫苑紫苑`', '拉拉阿拉<div>辣死了都是辣的</div><div>打算看大神快来</div><div>撒大声地</div>', '1480931499', '2');
INSERT INTO `node_articles_comment` VALUES ('14', '1', '恩，赞同楼上的说法', '1480931663', '3');
INSERT INTO `node_articles_comment` VALUES ('15', 'name', '恩。我来支援', '1480933541', '1');
INSERT INTO `node_articles_comment` VALUES ('16', 'name', '咯咯咯', '1480987224', '2');
INSERT INTO `node_articles_comment` VALUES ('17', 'name', '写的好啊', '1480987311', '2');
INSERT INTO `node_articles_comment` VALUES ('18', '一生懸命', '一看就是狗血小说', '1480988864', '1');
INSERT INTO `node_articles_comment` VALUES ('19', '一生懸命', 'I think this article is very good~', '1481003296', '3');
INSERT INTO `node_articles_comment` VALUES ('20', '一生懸命', '啊哈哈哈 你们挺搞笑的', '1481003449', '3');
INSERT INTO `node_articles_comment` VALUES ('21', '小治爷', '哦哈，我觉得这篇文章写的挺好的。<div>虽然我欣赏不来</div>', '1481018972', '1');
INSERT INTO `node_articles_comment` VALUES ('22', '小治爷', '我真的是 无力吐槽这种小说。<div><span style=\"font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;\">_ _ _ _ _&nbsp;</span><span style=\"font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;\">_ _ _ _ _&nbsp;</span><span style=\"font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;\">_ _ _ _ _&nbsp;</span><span style=\"font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;\">_ _ _ _ _</span><br style=\"box-sizing: content-box; font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;\"><span style=\"font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;\">\" 我是文艺青年 \"</span><br style=\"box-sizing: content-box; font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;\"><span style=\"font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;\">\" 我为自己代言 \"</span><br style=\"box-sizing: content-box; font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;\"><span style=\"font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;\">\"王者就是我我就是涛哥\"</span><br></div><div><span style=\"font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;\"><br></span></div>', '1481187806', '1');
INSERT INTO `node_articles_comment` VALUES ('23', '小治爷', '写的什么玩意啊 狗屁不通。', '1481265538', '1');
INSERT INTO `node_articles_comment` VALUES ('24', '一生懸命', '小时候我就看过这篇。这篇童话给我的感觉非常的好', '1481536463', '2');
INSERT INTO `node_articles_comment` VALUES ('25', '佐佐木君~', 'oooooooooo~-~', '1482205376', '1');
INSERT INTO `node_articles_comment` VALUES ('26', '1', '哟吼', '1482255195', '1');

-- ----------------------------
-- Table structure for node_articles_link
-- ----------------------------
DROP TABLE IF EXISTS `node_articles_link`;
CREATE TABLE `node_articles_link` (
  `aid` int(10) NOT NULL AUTO_INCREMENT,
  `author` varchar(10) NOT NULL,
  `src` varchar(20) NOT NULL,
  `created_at` varchar(20) NOT NULL,
  `title` varchar(30) NOT NULL COMMENT '文章标题',
  `content` text NOT NULL,
  `type` varchar(10) NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of node_articles_link
-- ----------------------------
INSERT INTO `node_articles_link` VALUES ('1', '心悦柏然', '/articles/1', '1479205952', '风流贵公子', '<p>我是流川世家的千金——冰蝶，我爸爸拥有无数财产，他有宝马、奔驰、奥迪等等，前不久我过生日，他还给了我一栋8层别墅、三辆奥迪、50个苹果手机\r\n今天，开学了，他开着50辆宝马和80多个保镖送我，我来到学校，刚下车就有很多人围来，喘不过气，他们有的送我玫瑰，有的送我巧克力，哎！真烦，我的保镖接下了所有东西，并给我开路，善良的我让保镖把这些给贫困山区\r\n突然，远方有几十辆车开来，那气场和我简直不分上下，从车上下来了一个好帅的男孩，我呆呆望着他，快要断气了，我深深爱上了他！</p><p>于是，我朝那边走，在我离他1米远时，突然许多女生跑过去围着他，我摔倒在地，哭了起来，眼泪落在地上，地上开出了小花，这时，男孩走了过来，伸出了受，对我说：美丽的小姐，我来扶你吧！ 此刻，我激动得又要快断气了！\r\n我把我光白如玉的手伸过去，他抓住了，我被他拉起来了，他好强大啊！我们互相对望，我激动得快要断气了，他的眼神使我快要融化了，那紫色的眼闪着光\r\n他的嘴唇慢慢靠近我，在我的樱唇上停留了一秒，说：我叫佐藤影风，我爱你！\r\n我说：我叫流川冰蝶，我也爱你！我们相互对视，他拉着我的手，我再次快断气了他走了，我站在原地，快乐得哭了，地上开出了许多小花</p><p>第二天，我遇到了他，那个高大帅气的影风，他主动对我笑，我也和他笑，他在我耳边轻说：亲爱的，下午咖啡馆见！我激动得心快要停止跳动了\r\n下午，我来到咖啡馆，看到他正在喝咖啡，美丽的嘴唇一张一合，好性感！\r\n可我又看到，他旁边的桌子有九个女孩，都很漂亮，但都比不上我，影风看到我，朝我招手，我坐过去，他说：你今天好美！我快乐得脸红了\r\n接着，她依次指9个女孩说：这是林洛、米娜、何瑶、岢岚、若胡、姬武、米拉、爱娜、欧亚，她们是我的女友！\r\n我好气，说：那我呢？他戏说：你是我的第十个女友啊！哈哈！以后你来陪我吧！我一时无语了，我好伤心，眼泪掉在地上变成了花\r\n我哭着跑出去了，好伤心啊！我在一棵樱花树下，眼泪如泉涌般出来了，泥土上长出了花。</p><p>我又要窒息了，我感觉他才是最爱我的人。他说：我叫失野花，做我女友吧？我感动了，同时又想：虽然我爱的是影风，可花又那么帅，我要做他女友，让影风看看我流川冰蝶的本事！，于是我答应了他，点点头 \r\n他一把抱住我的香背，嘴唇停在我嘴唇上，他敲开我的齿，舌头探了进去，与我缠绵，吸着我的芳香我感觉我好幸福 \r\n花轻轻说：我爱你，好爱！我也说：我也爱你！接着，他把我抱起，抱到了他的车上，开始拔我的衣服，我的酥胸外露，我却不知道他在干什么\r\n接着他脱去我的裤子，他做了一连串的动作我不解的动作，然后我疼得难受，啊啊啊啊啊好疼！血流出了，开了一朵朵红玫瑰，他抱着我，我无力挣扎，他好有劲，好疼！我问：花，你是不是用刀子捅我？为什么这么疼还流血？\r\n花说：不，这样你就是我的人了！他加快了速度，我不明白这是怎么回事，为什么说这样我就是他的呢？过了一会，他停了，把什么东西液体弄出来\r\n花说：你是我的人了，嫁给我！他拿出一个很大的钻石戒指，我感动答应了，我又哭了，泪水成了百合花。</p><p>连续几天，我都和花交往，我们亲得像一个人每天下午，我们都会去约会，我们是别人眼中的标准情侣。有一天，我们在一棵桃花树下约会，花说：冰蝶，你美得就像这桃花！我脸红了，说：花，你愿意娶我吗？花说：傻瓜，我怎么不愿意呢？\r\n我们互望着，手连在了一起，眼看我们又要吻了，这时，一个声音打破了我们之间幸福的宁静，“冰蝶是我的，谁都不许抢！”我吓得晕过去了，花抱着我，叫我，他的眼泪滴在了我脸上。\r\n我醒的时候，闻到一大股消毒水味，我睁开眼看了看，原来是我们家开的私家医院啊！旁边，父亲、一大堆仆人、花、影风都在，他们个个眼里流露出担惊受怕的神色，父亲拉着我的手说：蝶儿，你终于醒了，幸亏花少爷和影风少爷把你送进医院啊！</p><p>这个时候，花突然说：叔叔，请你们离开一下，我要和影风和冰蝶谈谈。于是，父亲说：你们和我都退下吧！于是仆人都退了，只剩下我们三个人。\r\n花拉着我的手说：蝶宝贝，你吓死我了！如果你死了，我也不活了！影风一把推开花，说：冰蝶是我的！ \r\n他们就要打起来了，这是，我说：别吵了！我们好好谈！他们望了望苍白的我，停手坐在我的病床前。\r\n影风抓住的手腕，问：冰蝶，你说！你说！你爱谁？ 啊！好痛！我叫出了声。影风连忙放开，直说对不起。\r\n这时，我经过一番思考，说：其实，我爱影风哥哥，我也爱花哥哥，只是影风哥哥有10个女友，我选择了花哥哥！影风连忙说：不不！冰蝶，那几个女人都是我找来试探你的，我只是想考验你是不是真爱我！\r\n我被影风哥哥感动了，他为了我付出这么多，花哥哥也听得满脸泪痕，他说：我也被感动了！，之后他对花悄悄说了几句，我好像听见他说我们已经做过什么什么的。之后，影风说：没关系，我不在乎这些！花感动的说：啊！太好了，冰蝶，你遇到了个好男人，我放心把你交给他了！祝福你们。</p>', 'love');
INSERT INTO `node_articles_link` VALUES ('2', '安徒升', '/articles/2', '1479205920', '阿里巴巴与四十大盗', '<p>很久以前，在波斯国的某城市里住着兄弟俩，哥哥叫戈西母，弟弟叫阿里巴巴。父亲去\r\n世后，他俩各自分得了有限的一点财产，分家自立，各谋生路。不久银财便花光了，生活日\r\n益艰难。为了解决吃穿，糊口度日，兄弟俩不得不日夜奔波，吃苦耐劳。</p><p>后来戈西母幸运地与一个富商的女儿结了婚，他继承了岳父的产业，开始走上做生意的\r\n道路。由于生意兴隆，发展迅速，戈西母很快就成为远近闻名的大富商了。</p><p>阿里巴巴娶了一个穷苦人家的女儿，夫妻俩过着贫苦的生活。全部家当除了一间破屋\r\n外，就只有三匹毛驴。阿里巴巴靠卖柴禾为生，每天赶着毛驴去丛林中砍柴，再驮到集市去\r\n卖，以此维持生活。</p><p>有一天，阿里巴巴赶着三匹毛驴，上山砍柴。他将砍下的枯树和干木柴收集起来，捆绑\r\n成驮子，让毛驴驮着。砍好柴准备下山的时候，远处突然出现一股烟尘，弥漫着直向上空飞\r\n扬，朝他这儿卷过来，而且越来越近。靠近以后，他才看清原来是一支马队，正急速向这个\r\n方向冲来。</p><p>阿里巴巴心里害怕，因为若是碰到一伙歹徒，那么毛驴会被抢走，而且自身也性命难\r\n保。他心里充满恐惧，想拔脚逃跑，但是由于那帮人马越来越近，要想逃出森林，已是不可\r\n能的了，他只得把驮着柴禾的毛驴赶到丛林的小道里，自己爬到一棵大树上躲避起来。\r\n那棵大树生长在一个巨大险峭的石头旁边。他把身体藏在茂密的枝叶间，从上面可以看\r\n清楚下面的一切，而下面的人却看不见他。</p><p>这时候，那帮人马已经跑到那棵树旁，勒马停步，在大石头前站定。他们共有四十人，\r\n一个个年轻力壮，行动敏捷。阿里巴巴仔细打量，看起来，这是一伙拦路抢劫的强盗，显然\r\n是刚刚抢劫了满载货物的商队，到这里来分赃的，或者准备将抢来之物隐藏起来。\r\n阿里巴巴心里这样想着，决心探个究竟。</p><p>匪徒们在树下拴好马，取下沉甸甸的鞍袋，里面显然装着金银珠宝。\r\n这时，一个首领模样的人背负沉重的鞍袋，从丛林中一直来到那个大石头跟前，喃喃地\r\n说道：“芝麻，开门吧！”随着那个头目的喊声，大石头前突然出现一道宽阔的门路，于是\r\n强盗们鱼贯而入。那个首领走在最后。</p><p>他小心翼翼地走了进去，举目一看，那是一个有穹顶的大洞，从洞顶的通气孔透进的光\r\n线，犹如点着一盏灯一样。开始，他以为既然是一个强盗穴，除了一片阴暗外，不会有其它\r\n的东西。可是事实出乎他的意料。洞中堆满了财物，让人目瞪口呆。一堆堆的丝绸、锦缎和\r\n绣花衣服，一堆堆彩色毡毯，还有多得无法计数的金币银币，有的散堆在地上，有的盛在皮\r\n袋中。猛一下看见这么多的金银财富，阿里巴巴深信这肯定是一个强盗们数代经营、掠夺所\r\n积累起来的宝窟。</p>', 'fairy');
INSERT INTO `node_articles_link` VALUES ('3', '枚狐', '/articles/3', '1479205931', '哭泣的石头', '<p>暂无</p>', 'suspense');
INSERT INTO `node_articles_link` VALUES ('4', '小治爷', '/articles/4', '1479205988', '校园诡影', '<p>暂无</p>', 'suspense');
INSERT INTO `node_articles_link` VALUES ('5', '小治爷', '/articles/5', '1479205988', '校园诡影2', '<p>暂无</p>', 'suspense');
INSERT INTO `node_articles_link` VALUES ('6', '小治爷', '/articles/6', '1479205988', '校园诡影3', '<p>暂无</p>', 'suspense');
INSERT INTO `node_articles_link` VALUES ('7', '宁航一', '/articles/7', '1479205988', '多出来的第14个人', '<p>暂无</p>', 'suspense');

-- ----------------------------
-- Table structure for node_danmaku
-- ----------------------------
DROP TABLE IF EXISTS `node_danmaku`;
CREATE TABLE `node_danmaku` (
  `danmakuid` int(255) NOT NULL AUTO_INCREMENT COMMENT '弹幕id 唯一标识符',
  `created_at` int(10) NOT NULL COMMENT '弹幕生成时间',
  `vid` int(10) NOT NULL COMMENT '对应视频id',
  `time` int(5) NOT NULL COMMENT '弹幕出现时间',
  `content` varchar(40) NOT NULL COMMENT '弹幕内容',
  `size` varchar(6) NOT NULL,
  `type` varchar(6) NOT NULL COMMENT '弹幕类型(normal-普通、top-顶端、bottom-底部)',
  `color` varchar(20) NOT NULL COMMENT '弹幕颜色',
  `position` int(3) NOT NULL COMMENT '弹幕位置',
  `name` varchar(25) NOT NULL COMMENT '弹幕主人',
  PRIMARY KEY (`danmakuid`)
) ENGINE=MyISAM AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of node_danmaku
-- ----------------------------
INSERT INTO `node_danmaku` VALUES ('1', '1479205900', '1', '3', '看到Papi我就滚进来了', 'normal', 'normal', 'rgb(255,255,255)', '403', '紫苑紫苑`');
INSERT INTO `node_danmaku` VALUES ('2', '1479205999', '1', '62', 'hahahaha', 'normal', 'normal', 'rgb(255,255,255)', '108', '紫苑紫苑`');
INSERT INTO `node_danmaku` VALUES ('3', '1479208126', '1', '24', '发个弹幕测试一下哈', 'normal', 'normal', 'rgb(255,255,255)', '34', '紫苑紫苑`');
INSERT INTO `node_danmaku` VALUES ('4', '1479200000', '2', '2', '凉子姐姐我爱你', 'normal', 'normal', 'rgb(255,255,255)', '55', '紫苑紫苑`');
INSERT INTO `node_danmaku` VALUES ('5', '1479204444', '2', '16', '23333 姐姐你是在是太可爱了', 'normal', 'normal', 'rgb(255,255,255)', '24', '紫苑紫苑`');
INSERT INTO `node_danmaku` VALUES ('6', '1482055227', '2', '19', '卡哇伊，好可爱的姐姐！', 'normal', 'normal', 'rgb(255,255,255)', '379', '小治爷');
INSERT INTO `node_danmaku` VALUES ('7', '1482055237', '2', '28', '卡哇伊，好可爱的姐姐！', 'normal', 'normal', 'rgb(255,255,255)', '47', '小治爷');
INSERT INTO `node_danmaku` VALUES ('8', '1482055315', '2', '63', '魔性的笑容', 'normal', 'normal', 'rgb(255,255,255)', '237', '小治爷');
INSERT INTO `node_danmaku` VALUES ('9', '1482055549', '2', '78', '23333333 国民美少女', 'normal', 'normal', 'rgb(255,255,255)', '176', '小治爷');
INSERT INTO `node_danmaku` VALUES ('10', '1482055596', '2', '0', '不如人如如', 'normal', 'normal', 'rgb(255,255,255)', '408', '小治爷');
INSERT INTO `node_danmaku` VALUES ('11', '1482055705', '2', '9', '啦啦啦啦啦啦绿绿绿绿绿绿绿绿绿', 'normal', 'normal', 'rgb(255,255,255)', '338', '小治爷');
INSERT INTO `node_danmaku` VALUES ('13', '1482055760', '2', '4', '1111111111111', 'normal', 'normal', 'rgb(255,255,255)', '68', '小治爷');
INSERT INTO `node_danmaku` VALUES ('14', '1482055905', '2', '10', '23333333333333', 'normal', 'normal', 'rgb(255,255,255)', '342', '小治爷');
INSERT INTO `node_danmaku` VALUES ('15', '1482055943', '2', '48', '实在是太可爱了（笑）~', 'normal', 'normal', 'rgb(255,255,255)', '236', '小治爷');
INSERT INTO `node_danmaku` VALUES ('16', '1482056098', '2', '8', '美美哒', 'normal', 'normal', 'rgb(255,255,255)', '170', '小治爷');
INSERT INTO `node_danmaku` VALUES ('17', '1482057219', '2', '16', '不如跳舞', 'normal', 'normal', 'rgb(255,255,255)', '345', '小治爷');
INSERT INTO `node_danmaku` VALUES ('18', '1482057251', '2', '49', '不如跳舞2', 'normal', 'normal', 'rgb(255,255,255)', '154', '小治爷');
INSERT INTO `node_danmaku` VALUES ('19', '1482057382', '2', '44', '这个商店街是哪个综艺？我怎么没看过', 'normal', 'normal', 'rgb(255,255,255)', '320', '小治爷');
INSERT INTO `node_danmaku` VALUES ('20', '1482057483', '3', '10', '我是第一个？？', 'normal', 'normal', 'rgb(255,255,255)', '182', '小治爷');
INSERT INTO `node_danmaku` VALUES ('21', '1482057530', '3', '21', '再发送一条测试下哈', 'normal', 'normal', 'rgb(255,255,255)', '193', '小治爷');
INSERT INTO `node_danmaku` VALUES ('22', '1482058902', '2', '11', '祝玄你好啊', 'normal', 'normal', 'rgb(255,255,255)', '34', '紫苑紫苑`');
INSERT INTO `node_danmaku` VALUES ('23', '1482059163', '2', '0', 'hi', 'normal', 'normal', 'rgb(255,255,255)', '114', 'dddx	');
INSERT INTO `node_danmaku` VALUES ('24', '1482059173', '2', '7', '好帅', 'normal', 'normal', 'rgb(255,255,255)', '202', 'dddx	');
INSERT INTO `node_danmaku` VALUES ('25', '1482059878', '2', '15', '好羞耻啊啊~~~~~~~~~~', 'normal', 'normal', 'rgb(255,255,255)', '388', '紫苑紫苑`');
INSERT INTO `node_danmaku` VALUES ('26', '1482060001', '2', '103', '可耻的笑了 我站墙角去了...', 'normal', 'normal', 'rgb(255,255,255)', '91', '紫苑紫苑`');
INSERT INTO `node_danmaku` VALUES ('27', '1482061521', '2', '33', '噗嗤~', 'normal', 'normal', 'rgb(255,255,255)', '180', '紫苑紫苑`');
INSERT INTO `node_danmaku` VALUES ('28', '1482067192', '2', '0', 'wwwwwwwwwwwwwwwwwwwwwwww', 'normal', 'normal', 'rgb(255,255,255)', '114', 'dddx	');
INSERT INTO `node_danmaku` VALUES ('29', '1482068249', '2', '31', '另外的两个小伙伴，大家好~', 'normal', 'normal', 'rgb(255,255,255)', '181', 'dddx	');
INSERT INTO `node_danmaku` VALUES ('30', '1482068394', '1', '76', '哈哈哈，我妈妈也是这样的', 'normal', 'normal', 'rgb(255,255,255)', '252', 'dddx	');
INSERT INTO `node_danmaku` VALUES ('31', '1482068484', '1', '158', '永远都在打折', 'normal', 'normal', 'rgb(255,255,255)', '169', 'dddx	');
INSERT INTO `node_danmaku` VALUES ('32', '1482068673', '1', '11', '鬼畜的op', 'normal', 'normal', 'rgb(255,255,255)', '326', 'dddx	');
INSERT INTO `node_danmaku` VALUES ('33', '1482068830', '1', '21', 'hello那个动作好萌', 'normal', 'normal', 'rgb(255,255,255)', '410', 'dddx	');
INSERT INTO `node_danmaku` VALUES ('34', '1482069731', '3', '43', '我也不知道撒为什么要买好耳机', 'normal', 'normal', 'rgb(255,255,255)', '403', 'dddx	');
INSERT INTO `node_danmaku` VALUES ('35', '1482070417', '2', '68', 'かわいいね　広末涼子', 'normal', 'normal', 'rgb(255,255,255)', '268', 'name');
INSERT INTO `node_danmaku` VALUES ('36', '1482117903', '4', '20', 'printf（‘hello world！’）', 'normal', 'normal', 'rgb(255,255,255)', '292', 'name');
INSERT INTO `node_danmaku` VALUES ('37', '1482117976', '2', '71', '还要需要优化下弹幕位置生成的算法才行', 'normal', 'normal', 'rgb(255,255,255)', '316', 'name');
INSERT INTO `node_danmaku` VALUES ('38', '1482123415', '5', '37', '好漂亮的博主 啊！！！爱你~~', 'normal', 'normal', 'rgb(255,255,255)', '144', '六六六');
INSERT INTO `node_danmaku` VALUES ('39', '1482123483', '5', '16', '你好啊~小文吉', 'normal', 'normal', 'rgb(255,255,255)', '298', 'name');
INSERT INTO `node_danmaku` VALUES ('40', '1482205165', '4', '23', '前排表白UP主', 'normal', 'normal', 'rgb(255,255,255)', '415', '佐佐木君~');
INSERT INTO `node_danmaku` VALUES ('41', '1482205240', '1', '23', 'hello 我是papi~', 'normal', 'normal', 'rgb(255,255,255)', '83', '佐佐木君~');
INSERT INTO `node_danmaku` VALUES ('42', '1482212222', '5', '15', '短发控报道', 'normal', 'normal', 'rgb(255,255,255)', '363', '佐佐木君~');
INSERT INTO `node_danmaku` VALUES ('43', '1482231877', '4', '1', '我我我我', 'normal', 'normal', 'rgb(255,255,255)', '126', '1');
INSERT INTO `node_danmaku` VALUES ('44', '1482245480', '2', '88', '优衣库先生~', 'normal', 'normal', 'rgb(255,255,255)', '65', '1');
INSERT INTO `node_danmaku` VALUES ('45', '1482247086', '1', '41', '我觉得papi长得好像苏菲玛索啊！', 'normal', 'normal', 'rgb(255,255,255)', '272', '1');
INSERT INTO `node_danmaku` VALUES ('46', '1482255056', '2', '28', '啦啦啦啦 发条弹幕测试下', 'normal', 'normal', 'rgb(255,255,255)', '328', '1');
INSERT INTO `node_danmaku` VALUES ('47', '1482256166', '5', '19', '弹幕边框测试', 'normal', 'normal', 'rgb(255,255,255)', '390', '1');
INSERT INTO `node_danmaku` VALUES ('48', '1482256347', '5', '9', '短发小美女', 'normal', 'normal', 'rgb(255,255,255)', '72', '1');
INSERT INTO `node_danmaku` VALUES ('49', '1482256477', '5', '15', '波波头有么？', 'normal', 'normal', 'rgb(255,255,255)', '161', '1');
INSERT INTO `node_danmaku` VALUES ('50', '1482256535', '5', '3', '美女', 'normal', 'normal', 'rgb(255,255,255)', '306', '1');
INSERT INTO `node_danmaku` VALUES ('51', '1482256583', '4', '19', 'php是世界上最好的语言！不服来辩~', 'normal', 'normal', 'rgb(255,255,255)', '209', '1');
INSERT INTO `node_danmaku` VALUES ('52', '1482256678', '4', '581', '看不懂了', 'normal', 'normal', 'rgb(255,255,255)', '317', '1');
INSERT INTO `node_danmaku` VALUES ('53', '1482256724', '4', '559', '有必要写的这么复杂么？', 'normal', 'normal', 'rgb(255,255,255)', '175', '1');
INSERT INTO `node_danmaku` VALUES ('54', '1482256773', '4', '403', '这是什么编辑器啊，求问', 'normal', 'normal', 'rgb(255,255,255)', '150', '1');
INSERT INTO `node_danmaku` VALUES ('55', '1482256805', '4', '572', '看的我想睡觉了都 - - ZZZZZZZZ', 'normal', 'normal', 'rgb(255,255,255)', '340', '1');
INSERT INTO `node_danmaku` VALUES ('56', '1482256836', '2', '73', '23333', 'normal', 'normal', 'rgb(255,255,255)', '322', '1');
INSERT INTO `node_danmaku` VALUES ('57', '1482256894', '1', '226', '这服务员有病吧...', 'normal', 'normal', 'rgb(255,255,255)', '277', '1');
INSERT INTO `node_danmaku` VALUES ('58', '1482256912', '1', '233', '2333', 'normal', 'normal', 'rgb(255,255,255)', '43', '1');
INSERT INTO `node_danmaku` VALUES ('59', '1482257193', '1', '177', 'wao', 'normal', 'normal', 'rgb(255,255,255)', '199', '1');
INSERT INTO `node_danmaku` VALUES ('60', '1482257232', '1', '135', '有喜欢的可以试哦', 'normal', 'normal', 'rgb(255,255,255)', '228', '1');
INSERT INTO `node_danmaku` VALUES ('61', '1482257253', '1', '66', '西单我去过', 'normal', 'normal', 'rgb(255,255,255)', '244', '1');
INSERT INTO `node_danmaku` VALUES ('62', '1482257284', '1', '181', '呜呜呜', 'normal', 'normal', 'rgb(255,255,255)', '61', '1');
INSERT INTO `node_danmaku` VALUES ('63', '1482257332', '5', '0', '新发弹幕测试', 'normal', 'normal', 'rgb(255,255,255)', '400', '1');
INSERT INTO `node_danmaku` VALUES ('64', '1482257398', '5', '167', '前来看看发型', 'normal', 'normal', 'rgb(255,255,255)', '305', '1');
INSERT INTO `node_danmaku` VALUES ('65', '1482291720', '5', '20', '有基友拉我裤链', 'normal', 'normal', 'rgb(255,255,255)', '58', '1');
INSERT INTO `node_danmaku` VALUES ('66', '1482499214', '5', '271', 'have fun', 'normal', 'normal', 'rgb(255,255,255)', '348', '测试账号');

-- ----------------------------
-- Table structure for node_user
-- ----------------------------
DROP TABLE IF EXISTS `node_user`;
CREATE TABLE `node_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识符',
  `nickname` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '用户名称',
  `password` varchar(25) NOT NULL COMMENT '登陆密码',
  `phone` varchar(16) NOT NULL,
  `mail` varchar(25) NOT NULL COMMENT '邮箱',
  `avatar_src` varchar(40) NOT NULL COMMENT '用户头像路径',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of node_user
-- ----------------------------
INSERT INTO `node_user` VALUES ('3', '1', '11', '111', '111', '/avatar/zmcr7e23pduz0k9.jpg');
INSERT INTO `node_user` VALUES ('5', '紫苑紫苑`', 'dyf12345', '18868831875', '514193797@qq.com', '/avatar/4e4xdz97tnfp3nmi.jpg');
INSERT INTO `node_user` VALUES ('4', 'name', '123456', '13757309493', 'dsjkdjasld@qq.com', '/avatar/default_user.jpg');
INSERT INTO `node_user` VALUES ('6', '一生懸命', '123456', '18317426252', '421800065@qq.com', '/avatar/default_user.jpg');
INSERT INTO `node_user` VALUES ('7', '小治爷', 'dyf19930903', '13906834945', 'dyf480@qq.com', '/avatar/default_user.jpg');
INSERT INTO `node_user` VALUES ('8', 'dddx	', 'qwer12345', '18357162258', '873370293@qq.com', '/avatar/default_user.jpg');
INSERT INTO `node_user` VALUES ('9', '六六六', '123456', '13588199148', '13588199148@163.com', '/avatar/default_user.jpg');
INSERT INTO `node_user` VALUES ('10', '佐佐木君~', 'dyf123', '13257128421', '1235523@163.com', '/avatar/default_user.jpg');
INSERT INTO `node_user` VALUES ('11', 'double', 'mizhou2016', '13588199448', '810154358@qq.com', '/avatar/default_user.jpg');
INSERT INTO `node_user` VALUES ('24', '拉阿拉蕾', '123456', '13688888888', '12321@qq.com', '/avatar/26e2s1jylee1att9.jpg');
INSERT INTO `node_user` VALUES ('25', 'snowman', '123456', '123456789', '1232312@qq.com', '/avatar/bke0ee8608yhw7b9.jpg');
INSERT INTO `node_user` VALUES ('26', '美少女~', '123456', '13588199147', '460755844@qq.com', '/avatar/1wov58gzp0j54s4i.jpg');
INSERT INTO `node_user` VALUES ('27', '测试账号', '123456', '13512341234', 'aqweqw@163.com', '/avatar/s00tsa0h9bmlsor.jpg');
INSERT INTO `node_user` VALUES ('28', '少女', '008000', '13721538042', 'shaonv@qq.com', '/avatar/guxvmtdw1jq69a4i.jpg');

-- ----------------------------
-- Table structure for node_user_info
-- ----------------------------
DROP TABLE IF EXISTS `node_user_info`;
CREATE TABLE `node_user_info` (
  `template` varchar(255) DEFAULT NULL COMMENT '用户空间模板',
  `username` varchar(255) NOT NULL,
  `theme` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of node_user_info
-- ----------------------------
INSERT INTO `node_user_info` VALUES ('赵本山', 'name', null);
INSERT INTO `node_user_info` VALUES ('deepsea1', '紫苑紫苑', null);
INSERT INTO `node_user_info` VALUES ('赵本山', '小鹿', null);
INSERT INTO `node_user_info` VALUES ('snow2', '少女', null);
INSERT INTO `node_user_info` VALUES ('halloween1', '123', null);
INSERT INTO `node_user_info` VALUES ('hanabi4', '测试账号', 'hanabi');
INSERT INTO `node_user_info` VALUES ('snow1', '佐佐木君~', 'snow');

-- ----------------------------
-- Table structure for node_videos_link
-- ----------------------------
DROP TABLE IF EXISTS `node_videos_link`;
CREATE TABLE `node_videos_link` (
  `vid` int(10) NOT NULL COMMENT '视频id—唯一标识符',
  `video_url` varchar(20) NOT NULL,
  `cover_url` varchar(20) NOT NULL COMMENT '视频封面url',
  `title` varchar(255) NOT NULL COMMENT '视频标题',
  `created_at` varchar(20) NOT NULL COMMENT '视频创建时间',
  `pv` int(6) NOT NULL COMMENT '该视频访问量',
  `dmk_num` int(6) NOT NULL COMMENT '该视频弹幕总数',
  `pop_num` int(6) NOT NULL COMMENT '投币数',
  PRIMARY KEY (`vid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of node_videos_link
-- ----------------------------
INSERT INTO `node_videos_link` VALUES ('1', '../v/1.mp4', 'i/video-cover/1.webp', 'papi酱的周一放送', '1481764245', '0', '15', '0');
INSERT INTO `node_videos_link` VALUES ('2', '../v/2.mp4', 'i/video-cover/2.jpg', '凉子姐姐魔性笑', '1481781856', '0', '28', '0');
INSERT INTO `node_videos_link` VALUES ('3', '../v/3.mp4', 'i/video-cover/3.webp', '你为什么需要一个好耳机', '1481896423', '0', '3', '0');
INSERT INTO `node_videos_link` VALUES ('4', '../v/4.mp4', 'i/video-cover/4.webp', '使用C++来表白（输出“I LOVE YOU!”）', '1482062400', '0', '8', '0');
INSERT INTO `node_videos_link` VALUES ('5', '../v/5.mp4', 'i/video-cover/5.webp', '【Sayi酱】十款短发造型教程', '1482111884', '0', '11', '0');
