import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL} from "@env";


const self = module.exports = {

    /**
     * Look in storage to find cached user. if null, forward to login page
     * @returns {Promise<null|any>}
     */
    findCachedUser: async function () {
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
            return JSON.parse(savedUser);
        }
        throw new Error("THE system has logged you out of the system. Please log back in");
    },

    /**
     * MAke a request to the API
     * @returns {Promise<null|any>}
     */
    makeAPIRequest: async function (params) {

        try {
            const url = `${API_URL}/${params.url}`;
            const options = {};
            options.method = params.method;

            options.headers = {
                "Content-Type": "application/json",
                "api_key": ""
            };
            if (params.no_key) {

            } else {
                const user = await self.findCachedUser();
                options.headers.api_key = user.api_key;
            }
            if (params.body) {
                options.body = JSON.stringify(params.body)
            }
            const response = await fetch(url, options);
            let data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    /**
     *
     * @param user_key
     * @param allowedRoles
     * @returns {Promise<boolean>}
     */
    // hasPermission: async function (user_key, allowedRoles) {
    //     const app = require('../../server/server');
    //     const serverUtils = require('../../server/utils/utils');
    //     try {
    //         const user = await app.models.Users.findOne({where: {api_key: user_key}});
    //         if (!user) {
    //             throw new Error("Invalid API key.");
    //         }
    //         const isAllowed = serverUtils.isAllowed(user, allowedRoles);
    //         if (isAllowed) {
    //             return true;
    //         }
    //         throw new Error("You don't have access to this resource.");
    //     } catch (ee) {
    //         throw ee
    //     }
    // },
    // findDuplicates: function (arry) {
    //     const set = new Set(arry);
    //     const duplicates = arry.filter(item => {
    //         if (set.has(item)) {
    //             set.delete(item);
    //         } else {
    //             return item;
    //         }
    //     });
    //     return duplicates;
    // },
    // /**
    //  *
    //  * @param ctx
    //  * @returns {Promise<boolean>}
    //  */
    // prism_authorization: async function (ctx) {
    //     const req = ctx.req;
    //     const api_key = req.headers['user_key'] || req.query.user_key || req.body.user_key;
    //     if (api_key) {
    //         return await self.hasPermission(api_key, ["MACHINE", "ADMIN", "CMAP_CORE", "PRISM"]);
    //     } else {
    //         return false;
    //     }
    // },
    // mts_authorization: async function (ctx) {
    //     const req = ctx.req;
    //     const api_key = req.headers['user_key'] || req.query.user_key || req.body.user_key;
    //     if (api_key) {
    //         return await self.hasPermission(api_key, ["MACHINE", "ADMIN", "CMAP_CORE", "MTS_MANAGER"]);
    //     } else {
    //         return false;
    //     }
    // },
    // prism_before_remote: async function (ctx) {
    //     const allowed = await self.prism_authorization(ctx);
    //     if (allowed) {
    //         return "done";
    //     }
    //     throw new Error("Do not have permission to view resource");
    // },
    // /**
    //  *
    //  * @param dataSource
    //  * @param sqlStatement
    //  * @param params
    //  * @param options
    //  * @returns {Promise<unknown>}
    //  */
    // executeAsync: async function (dataSource, sqlStatement, params, options) {
    //     return new Promise((resolve, reject) => {
    //         dataSource.connector.execute(sqlStatement, params, options, (err, result) => {
    //             if (err) reject(err);
    //             else resolve(result);
    //         });
    //     });
    // },
    // uniquify: function (list2Uniquify,element) {
    //     return _.uniq(list2Uniquify, function (x) {
    //         return x[element];
    //     });
    // },
    // /**
    //  *
    //  * @param map
    //  * @returns {[]}
    //  */
    // createInsertStatementFromMap: function (map) {
    //     const sqlValues = [];
    //     for (const [fieldKey, values] of map.entries()) {
    //         if (values && values.length > 0) {
    //             const fieldValues = _.uniq(values);
    //             for (let fieldValue of fieldValues) {
    //                 sqlValues.push("(" + fieldKey + "," + fieldValue + ")");
    //             }
    //         }
    //     }
    //     return sqlValues;
    // },
    // createSelectStatement: function (collection, tableName,fieldName) {
    //
    //     const field = fieldName? fieldName : "name";
    //     let sqlstatement = "";
    //     if (collection && collection.length > 0) {
    //         sqlstatement = "SELECT distinct id FROM " + tableName + " WHERE " + field + " in (";
    //         const stmtArray = _.map(collection, function(num){ return "'" + num.trim() + "'"});
    //         sqlstatement = sqlstatement + stmtArray.join(",") + ");"
    //     }
    //     return sqlstatement;
    // }
};
module.exports = self;
