/**
 * Created by nanyang on 16/3/17.
 */
var path = require('path');
var fs   = require('fs');
module.exports = function(spon){

	var currentUrl = process.cwd();

	spon.cli
    .command('mb [cmd]')
    .description('concat html js css')
    .option("-n, --name [type]", "针对具体的页面进行命令操作")
    .action(function(cmd, options){
    	if (cmd != 'concat') {
    		return;
    	}
    	var pageName = options.name;
    	if (typeof pageName !== 'string') {
    		spon.log.error('请输入页面名字');
    		return;
    	}

    	var jsPath = path.join(currentUrl, '/build/src/pages/' + pageName + '/' + pageName + '.min.js');
    	var cssPath = path.join(currentUrl, '/build/src/pages/' + pageName + '/' + pageName + '.min.css');
    	var htmlPath = path.join(currentUrl, '/build/src/pages/' + pageName + '/' + pageName + '.html');
    	var concatPath = path.join(currentUrl, '/build/src/pages/' + pageName + '/' + pageName + '-concat.html');
    	var sharePath = path.join(__dirname, 'share-temp.js');

	    if (!fs.existsSync(jsPath)) {
	    	spon.log.error('can\'t found ' + pageName +' page. checkout if we have this page or you may forget build this page');
	    	return;
	    }

    	if(fs.existsSync(jsPath)){
          	var jsContent = fs.readFileSync(jsPath, 'utf-8');
        }
    	if(fs.existsSync(cssPath)){
          	var cssContent = fs.readFileSync(cssPath, 'utf-8');
        }
        if(fs.existsSync(htmlPath)){
          	var htmlContent = fs.readFileSync(htmlPath, 'utf-8');
        }

        function getCssContent (cssContent) {
        	return '<style>' + cssContent + '</style>';
        }
        function getJsContent (jsContent) {
        	return '<script>' + jsContent + '</script>';
        }
        function getShareContent () {
        	return '<script>' + '\n' + fs.readFileSync(sharePath, 'utf-8') + '\n'  + '</script>';
        }
        function getHtmlContent (htmlContent) {
        	var startIndex = htmlContent.indexOf('<body>') + 6;
        	var endIndex = 0;
        	if (htmlContent.search(/<script/i) == -1) {
        		endIndex = htmlContent.indexOf('</body>') - 1;
        	} else {
        		if (htmlContent.search(/<script(.+)?src/i) < htmlContent.indexOf('</body>')) {
        			endIndex = htmlContent.search(/<script(.+)?src/i) - 1;
        		} else {
        			endIndex = htmlContent.indexOf('</body>') - 1;
        		}
        	}
        	return htmlContent.substring(startIndex, endIndex + 1);
        }

        function getConcatContent () {
        	var content = getCssContent(cssContent) + '\n' + getHtmlContent(htmlContent) + '\n' + getJsContent(jsContent) + '\n' + getShareContent();
        	return content;
        }

  		fs.writeFile(concatPath, getConcatContent() ,function(err){
            if(err) {
              	spon.log.error(err);
            } else {
            	spon.log.info('finish concat content!');
            }
        });
    });
    spon.cli
    .command('pc [cmd]')
    .description('concat html js css')
    .option("-n, --name [type]", "针对具体的页面进行命令操作")
    .action(function(cmd, options){
    	if (cmd != 'concat') {
    		return;
    	}
    	var pageName = options.name;
    	if (typeof pageName !== 'string') {
    		spon.log.error('请输入页面名字');
    		return;
    	}

    	var jsPath = path.join(currentUrl, '/build/src/pages/' + pageName + '/' + pageName + '.min.js');
    	var cssPath = path.join(currentUrl, '/build/src/pages/' + pageName + '/' + pageName + '.min.css');
    	var htmlPath = path.join(currentUrl, '/build/src/pages/' + pageName + '/' + pageName + '.html');
    	var concatPath = path.join(currentUrl, '/build/src/pages/' + pageName + '/' + pageName + '-concat.html');

    	if (!fs.existsSync(jsPath)) {
	    	spon.log.error('can\'t found ' + pageName +' page. checkout if we have this page or you may forget build this page');
	    	return;
	    }

    	if(fs.existsSync(jsPath)){
          	var jsContent = fs.readFileSync(jsPath, 'utf-8');
        }
    	if(fs.existsSync(cssPath)){
          	var cssContent = fs.readFileSync(cssPath, 'utf-8');
        }
        if(fs.existsSync(htmlPath)){
          	var htmlContent = fs.readFileSync(htmlPath, 'utf-8');
        }

        function getCssContent (cssContent) {
        	return '<style>' + cssContent + '</style>';
        }
        function getJsContent (jsContent) {
        	return '<script>' + jsContent + '</script>';
        }

        function getHtmlContent (htmlContent) {
        	var startIndex = htmlContent.indexOf('<body>') + 6;
        	var endIndex = 0;
        	if (htmlContent.search(/<script/i) == -1) {
        		endIndex = htmlContent.indexOf('</body>') - 1;
        	} else {
        		if (htmlContent.search(/<script(.+)?src/i) < htmlContent.indexOf('</body>')) {
        			endIndex = htmlContent.search(/<script(.+)?src/i) - 1;
        		} else {
        			endIndex = htmlContent.indexOf('</body>') - 1;
        		}
        	}
        	return htmlContent.substring(startIndex, endIndex + 1);
        }

        function getConcatContent () {
        	var content = getCssContent(cssContent) + '\n' + getHtmlContent(htmlContent) + '\n' + getJsContent(jsContent) + '\n';
        	return content;
        }

  		fs.writeFile(concatPath, getConcatContent() ,function(err){
            if(err) {
              	spon.log.error(err);
            } else {
            	spon.log.info('finish concat content!');
            }
        });
    });

}