<template>
  <div style="background-color:#fff;">
    <div style="padding: 2em 0;">
      <h1 style="color:#de7c23;text-align:center;font-size:34px;font-weight:400;margin:0 15%;">就医指南</h1>
    </div>
    <article class="weui_article">
      <section>
        <section>
          <span> </span>
          <p>
            <span><span style="font-family:宋体;">说明：</span><span><span>1. </span></span><span style="font-family:宋体;">使用前需要绑定{{platform}}支付，</span><span><span>2.</span></span><span style="font-family:宋体;">需要有{{hospital}}诊疗卡、健康卡。</span></span>
          </p>
          <span> </span>
          <p>
            <span style="font-family:宋体;"><span>{{hospital}}提供{{platform}}便捷就诊服务，{{platform}}服务包括以下功能</span></span>
          </p>
          <span> </span>
          <p>
            <span><b><span><span>1.</span></span>
            </b><b><span style="font-family:宋体;">在线挂号</span></b></span>
          </p>
          <span> </span>
          <p>
            <span><span><span>(1) .</span></span><span style="font-family:宋体;">挂号需绑定本院诊疗卡</span><span><span>(</span></span><span style="font-family:宋体;">只需绑定一次</span><span><span>)</span></span><span style="font-family:宋体;">。</span></span>
          </p>
          <span> </span>
          <p>
            <span><span><span>(2) .</span></span><span style="font-family:宋体;">挂号支付成功后，请查阅“电子挂号单”，到指定诊室外等候呼叫、就诊。</span></span>
          </p>
          <span> </span>
          <p>
            <span><span><span>(3) .</span></span><span style="font-family:宋体;">如需退号，请凭“电子挂号单”到各楼层挂号处办理。</span></span>
          </p>
          <span> </span>
          <p>
            <span><span><span>(4) .</span></span><span style="font-family:宋体;">{{platform}}支付暂不支持退伍军人、老人、残疾人等减免政策。</span></span>
          </p>
          <span> </span>
          <p>
            <span><b><span style="font-family:宋体;">选择院区</span><span> <span>– </span></span>
            </b><b><span style="font-family:宋体;">选择科室</span><span> <span>–</span></span></b><b><span style="font-family:宋体;">选择医生</span><span> <span>– </span></span></b><b><span style="font-family:宋体;">选择时间段</span><span> <span>–</span></span></b><b><span style="font-family:宋体;">选择就诊卡</span><span> <span>– </span></span></b><b><span style="font-family:宋体;">确认挂号</span><span><span>—</span></span></b><b><span style="font-family:宋体;">支付缴费</span></b></span>
          </p>
          <span> </span>
          <p>
            <span><b><span><span>2.</span></span>
            </b><b><span style="font-family:宋体;">在线取号</span></b></span>
          </p>
          <span> </span>
          <p>
            <span><span><span>(1) .</span></span><span style="font-family:宋体;">在其他平台（官网、电话）预约，使用本院诊疗卡预约的取号以及医生诊间加号的取号。</span></span>
          </p>
          <span> </span>
          <p>
            <span><b><span style="font-family:宋体;">选择诊疗卡</span><span> <span>– </span></span>
            </b><b><span style="font-family:宋体;">支付缴费</span></b></span>
          </p>
          <span> </span>
          <p>
            <span><b><span style="font-family:宋体;">选择日期</span><span><span>--</span></span>
            </b><b><span style="font-family:宋体;">选择院区</span><span> <span>– </span></span></b><b><span style="font-family:宋体;">选择科室</span><span> <span>–</span></span></b><b><span style="font-family:宋体;">选择医生</span><span> <span>– </span></span></b><b><span style="font-family:宋体;">选择时间点</span><span> <span>–</span></span></b><b><span style="font-family:宋体;">选择就诊卡</span><span> <span>– </span></span></b><b><span style="font-family:宋体;">确认挂号</span><span><span>—</span></span></b><b><span style="font-family:宋体;">支付缴费</span></b></span>
          </p>
          <span> </span>
          <!--<p>-->
            <!--<span><b><span><span>4.</span></span>-->
            <!--</b><b><span style="font-family:宋体;">候诊队列</span></b></span>-->
          <!--</p>-->
          <!--<span> </span>-->
          <!--<p>-->
            <!--<span><span><span>(1). </span></span><span style="font-family:宋体;">候诊队列支持实时查询候诊信息，可能因网络延时等原因造成信息不一致，{{platform}}查询仅供参考，请以现场候诊队列信息为准。</span></span>-->
          <!--</p>-->
          <!--<span> </span>-->
          <p>
            <span><b><span style="font-family:宋体;">选择诊疗卡</span><span> <span>– </span></span>
            </b><b><span style="font-family:宋体;">候诊队列信息</span></b></span>
          </p>
          <span> </span>
          <p>
            <span><b><span><span>5.</span></span>
            </b><b><span style="font-family:宋体;">就诊缴费</span></b></span>
          </p>
          <span> </span>
          <p>
            <span><span><span>(1). </span></span><span style="font-family:宋体;">缴费提供{{platform}}支付。</span></span>
          </p>
          <span> </span>
          <p>
            <span><span><span>(2). </span></span><span style="font-family:宋体;">处方单当天缴费有效。</span></span>
          </p>
          <span> </span>
          <p>
            <span><span><span>(3). </span></span><span style="font-family:宋体;">目前{{platform}}支付只提供自费缴费及普通医保缴费，门慢医保、门特医保、公费在{{platform}}支付按自费缴费，如需记账请移步到各楼层收费窗口进行缴费。</span></span>
          </p>
          <span> </span>
          <p>
            <span><span><span>(4). </span></span><span style="font-family:宋体;">如需打印发票或办理退费请凭{{platform}}缴费“电子凭条”到各楼层收费处办理。</span></span>
          </p>
          <span> </span>
          <p>
            <span><span><span>(5). </span></span><span style="font-family:宋体;">如需打印费用清单请凭发票到前线服务打印。</span></span>
          </p>
          <span> </span>
          <p>
            <span><b><span style="font-family:宋体;">选择诊疗卡</span><span> <span>– </span></span>
            </b><b><span style="font-family:宋体;">去缴费</span><span> <span>– </span></span></b><b><span style="font-family:宋体;">确认缴费</span><span> <span>–</span></span></b><b><span style="font-family:宋体;">支付缴费</span></b></span>
          </p>
          <span> </span>
          <p>
            <span><b><span><span>6.</span></span>
            </b><b><span style="font-family:宋体;">取报告单</span></b></span>
          </p>
          <span> </span>
          <p>
            <span><span><span>(1). </span></span><span style="font-family:宋体;">查询检查报告单</span></span>
          </p>
          <span> </span>
          <p>
            <span><span><span>(2). </span></span><span style="font-family:宋体;">查询检验报告单</span></span>
          </p>
          <span> </span>
          <p>
            <span><b><span style="font-family:宋体;">选诊疗卡</span><span> <span>– </span></span>
            </b><b><span style="font-family:宋体;">检查报告单</span></b></span>
          </p>
          <span> </span>
          <p>
            <span><b><span><span>7.</span></span>
            </b><b><span style="font-family:宋体;">满意度调查</span></b></span>
          </p>
          <span></span>
          <p>
            <span><span><span>(1). </span></span><span style="font-family:宋体;">面向近期在医院就诊过的用户</span></span>
          </p>
          <span></span>
          <p>
            <span><span><span>(2). </span></span><span style="font-family:宋体;">用户在就诊后1周内，可以做满意度调查或修改答案</span></span>
          </p>
          <span></span>
          <p>
            <span><b><span style="font-family:宋体;">客服电话工作时间：7:30 - 17:30</span><span> <span>– </span></span>
            </b>
            </span>
          </p>
          <span> </span>
          <p>
            <span><b><span style="font-family:宋体;">系统维护时间为：00:00 - 01:00；请勿在此时间段内下订单，以免导致订单错误，给您带来不必要的麻烦</span></b>
            </span>
          </p>
        </section>
      </section>
    </article>
  </div>
  <partial name="footer-copyright"></partial>
</template>
<script>
export default {
  name: 'HospServiceDescView',
  data: function () {
    return {
      platform: process.env.PLATFORM,
      hospital: process.env.HOSPITAL
    }
  }
}
</script>
