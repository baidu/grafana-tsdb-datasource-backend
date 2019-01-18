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
 * @author hq
 */
module.exports = {
    app: {
        // 如需外网访问请填写本机ip或 0.0.0.0
        // 强烈建议您只允许本机访问
        host: '127.0.0.1',
        port: '3333'
    },
    tsdb: {
        // write your ak&sk there
        ak: '<your ak>',
        sk: '<your sk>'
    }
};