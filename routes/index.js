/**
 * Copyright (c) 2018 Baidu, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file route file
 * @author hq(haoqian@baidu.com)
 */
const router = require('koa-router')();
const TsdbDataClient = require('@baiducloud/sdk').TsdbDataClient;
const config = require('../config/config');
const options = {headers: {'User-Agent': 'grafana-bce-sdk-js'}};
const getTsdbClient = async ctx => {
    const endpoint = ctx.headers.endpoint;
    const ak = process.env.AK || config.tsdb.ak;
    const sk = process.env.SK || config.tsdb.sk;
    const tsdbConfig = {
        endpoint: `http://${endpoint}`,
        credentials: {
            ak: ak,
            sk: sk
        }
    };
    const tsdbClient = new TsdbDataClient(tsdbConfig);
    return tsdbClient;
};

router.get('/v1/metric', async (ctx, next) => {
    try {
        const tsdbClient = await getTsdbClient(ctx);
        const response = await tsdbClient.getMetrics(options);
        ctx.body = response.body;
    } catch (error) {
        ctx.body = error;
        ctx.status = error.status_code || 500;
    }
});

router.get('/v1/metric/:metric/field', async (ctx, next) => {
    const tsdbClient = await getTsdbClient(ctx);
    try {
        const response = await tsdbClient.getFields(ctx.params.metric, options);
        ctx.body = response.body;
    } catch (error) {
        ctx.body = error;
        ctx.status = error.status_code || 500;
    }
});

router.get('/v1/metric/:metric/tag', async (ctx, next) => {
    const tsdbClient = await getTsdbClient(ctx);
    try {
        const response = await tsdbClient.getTags(ctx.params.metric, options);
        ctx.body = response.body;
    } catch (error) {
        ctx.body = error;
        ctx.status = error.status_code || 500;
    }
});

router.get('/v1/datapoint', async (ctx, next) => {
    const tsdbClient = await getTsdbClient(ctx);
    let response;
    try {
        const query = JSON.parse(ctx.query.query);
        response = await tsdbClient.getDatapoints(query.queries, options);
        ctx.body = response.body;
    } catch (error) {
        ctx.body = error;
        ctx.status = error.status_code || 500;
    }
});
module.exports = router;
