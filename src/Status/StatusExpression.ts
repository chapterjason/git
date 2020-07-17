/*
 * This file is part of the @mscs/git package.
 *
 *  Copyright (c) 2020 media-service consulting & solutions GmbH
 *
 *  For the full copyright and license information, please view the LICENSE
 * File that was distributed with this source code.
 */

export class StatusExpression {

    public static indexAndWork = "(?:([\\.MADRCU?!]{1})([\\.MADRCU?!]{1}))";

    public static subModule = "((?:N\\.\\.\\.)|(?:S(?:C|\\.)(?:M|\\.)(?:U|\\.)))";

    public static fileMode = "(\\d{6})";

    public static hash = "([A-Fa-f0-9]{40})";

    public static score = "(?:(R|C)(\\d{1,3}))";

    public static pathWithSeparation = "(?:(.*)(?:\x09|\x00)(.*))";

    public static path = "(.*)";

    /**
     * 1 <XY> <sub> <mH> <mI> <mW> <hH> <hI> <path>
     */
    public static ordinary = new RegExp([
        "1",
        StatusExpression.indexAndWork,
        StatusExpression.subModule,
        StatusExpression.fileMode,
        StatusExpression.fileMode,
        StatusExpression.fileMode,
        StatusExpression.hash,
        StatusExpression.hash,
        StatusExpression.path,
    ].join(" "));

    /**
     * 2 <XY> <sub> <mH> <mI> <mW> <hH> <hI> <X><score> <path><sep><origPath>
     */
    public static renamedOrCopied = new RegExp([
        "2",
        StatusExpression.indexAndWork,
        StatusExpression.subModule,
        StatusExpression.fileMode,
        StatusExpression.fileMode,
        StatusExpression.fileMode,
        StatusExpression.hash,
        StatusExpression.hash,
        StatusExpression.score,
        StatusExpression.pathWithSeparation,
    ].join(" "));

    /**
     * u <XY> <sub> <m1> <m2> <m3> <mW> <h1> <h2> <h3> <path>
     */
    public static unmerged = new RegExp([
        "u",
        StatusExpression.indexAndWork,
        StatusExpression.subModule,
        StatusExpression.fileMode,
        StatusExpression.fileMode,
        StatusExpression.fileMode,
        StatusExpression.fileMode,
        StatusExpression.hash,
        StatusExpression.hash,
        StatusExpression.hash,
        StatusExpression.path,
    ].join(" "));

    /**
     * ? <path>
     */
    public static untracked = new RegExp([
        "\\?",
        StatusExpression.path,
    ].join(" "));

    /**
     * ! <path>
     */
    public static ignored = new RegExp([
        "!",
        StatusExpression.path,
    ].join(" "));

}
