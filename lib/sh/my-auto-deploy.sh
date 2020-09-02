#!/bin/sh

handle=$1;      # 取得传入的参数1    举例：build prod
env=$2;         # 取得传入的参数2    举例：build sit

# TIP 此处，切记：【=号】两边，不允许有【空格】的存在。
# TIP 如果不如此，则会产生BUG。    BUG解决方法链接：https://blog.csdn.net/benben0729/article/details/80917872

# 测试服务器
remote_server_address="root@47.244.196.95"                                        # 远端IP+远端登录用户名
server_base_dir="/mnt/data/www"                                               # 存放压缩包、各个项目文件夹，的目录路径。
# blue环境（准正式）【名为blue，实际上目前就是  测试】
server_admin_project_dir_blue="/mnt/data/www/lottery-admin"                                        # Admin项目解压后目录

# 远程基准文件路径
pem_pubkey_file_path="../ecs-key-hongkong.pem"                                # 连接远端IP，所需要的【公钥文件】

# 本地压缩包路径
local_zip_file_path="./Entertainment-Admin.zip"                                             # 本地的【admin.zip】压缩文件
# 存储压缩包的地址
server_admin_current_zip="/mnt/data/www/Entertainment-Admin.zip"                            # Admin现用版本的压缩包
server_admin_backup_zip="/mnt/data/www/Entertainment-Admin_backup.zip"                      # Admin上个版本的压缩包



# 打包相关命令
command_to_build_prod="build"                                            # 在【npm run 命令】中执行命令
command_to_build_sit="build"                                            # 在【npm run 命令】中执行命令

#
#
#
#
#
#
#
#
#
#
#
#
#
#

# 正式服务器
remote_server_address_sit="root@161.117.86.185"                                      # 远端IP+远端登录用户名
# green环境（测试）
server_admin_project_dir="/mnt/data/www/admin/green"                                        # Admin项目解压后目录





# 远程部署机 webhook
# 如果用远程机器部署的话就要用到以下方法（基本思路：① 本机只有npm环境，而没有源代码 ② 从远程机器拉取源代码 ③ 源代码有了之后，设置国内镜像源，并且利用国内镜像源安装依赖 ④ 到了第4步，才开始正式执行，自动化部署任务）
# TIP 方法声明 〇
# preHandle(){
#     git pull orgin master
#     npm config set registry http://registry.npm.taobao.org/
#     npm install
#     npm run build-prod
# }

# TIP 方法声明 ①
# 清空dist目录
emptyRemoteDist(){
    if [ $env == "prod" ]
    then    # 若为生成环境
        # TIP 关于【echo】，大部分资料，参考稍后的一篇教程。但存在一个小BUG：有些指令名为反斜杠，教程里写作正斜杠，实际上还是反斜杠。     ECHO指令教程：https://blog.csdn.net/oqqssh/article/details/78614002
        # TIP 关于【echo提示声音】，现阶段只在完成后有【六连响】；其它的干扰声音，暂时替换为【|a】；将来有需要，再把【|a】替换为【\a】。
        # echo -e " \a [exec] \a remove remote:yourip folder"   # TIP -e，为开启加强echo模式，可接收特殊转义符指令；\a，若-e开启，则会在指定位置，发出警报声
        # ssh root@yourip "rm -rf /www/jiketoutiao_admin/*"     # TIP 利用ssh，执行远程指令。（不添加指令，则为远程登录；添加指令，则会直接在远程服务器，执行一切指令。（名为【远程指令】，实则和【本地指令】，只有宿主环境区别，自由度上没有任何区别。但是注意：默认没有本机指令的信息打印））
        echo -e " |a [exec] |a Environment:Product.  ${remote_server_address} "
        # 删除远端的解压后目录  TIP 不删除直接覆盖
#        ssh -i "${pem_pubkey_file_path}" ${remote_server_address} "rm -rf ${server_admin_project_dir}"
        # 删除Admin上个版本的压缩包
        ssh -i ${pem_pubkey_file_path} ${remote_server_address} "rm -f  ${server_admin_backup_zip}"
        # 重命名Admin现用版本的压缩包
        ssh -i ${pem_pubkey_file_path} ${remote_server_address} "mv ${server_admin_current_zip} ${server_admin_backup_zip}"
    else







        ############################## 若为线上环境
        # echo -e " |a [exec] |a remove remote:yourip folder"   # 同上
        # ssh root@yourip "rm -rf /www/jiketoutiao_admin/*"     # 同上
        echo -e " |a [exec] |a Environment:Development. You get wrong order set .  ${remote_server_address_sit} |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a "   # 提示错误
        # 删除远端的解压后目录 不删除 直接覆盖
#        ssh ${remote_server_address_sit} "rm -rf ${server_admin_project_dir}"
        # 删除Admin上个版本的压缩包
        ssh ${remote_server_address_sit} "rm -f  ${server_admin_backup_zip}"
        # 重命名Admin现用版本的压缩包
        ssh ${remote_server_address_sit} "mv ${server_admin_current_zip} ${server_admin_backup_zip}"
    fi
}

# TIP 方法声明 ②
# 发送文件到正式环境，服务器
transferFileToProSever(){
    if [ $env == "prod" ]
    then
    # 若为生成环境
    # echo -e " |a [exec] |a transfer file to product:yourip sever"   # 同上
    # scp -r ./dist/* root@yourip:/www/jiketoutiao_admin/   # TIP 与【SSH命令】实质上属于同一体系。唯一区别，为【SSH命令】仅在【远程服务器】的内部执行；而【SCP】指令，负责实现【本地、远程不同环境间】，文件的跨环境传输。     参考链接：https://www.cnblogs.com/webnote/p/5877920.html
    # 将本地【admin.zip】压缩文件，上传到【远端】的  /mnt/data/www文件夹下。
    scp -i ${pem_pubkey_file_path} ${remote_server_address} -r ${local_zip_file_path} "${remote_server_address}:${server_base_dir}"
    # 利用ssh，执行远程指令，解压【admin.zip】压缩文件，到  /mnt/data/www/admin文件夹下。
    ssh -i ${pem_pubkey_file_path} ${remote_server_address} "unzip -o ${server_admin_current_zip} -d ${server_admin_project_dir_blue}"
    else









      #################  若为线上环境
      scp ${remote_server_address_sit} -r ${local_zip_file_path} "${remote_server_address_sit}:${server_base_dir}"
      ssh ${remote_server_address_sit} "unzip -o ${server_admin_current_zip} -d ${server_admin_project_dir}"
    fi
}

# TIP 方法声明 ③
# 发送文件到测试环境，服务器
transferFileToTestSever(){
    # echo -e " |a [exec] |a transfer file to development::yourip sever"    # 同上
    # scp -r ./dist/* root@yourip:/www/jiketoutiao_admin/   # 同上
    echo -e "|a [exec] |a You get wrong order set . |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a |a "   # 提示错误
}

# TIP 执行表达式

# IF表达式
if [ $handle == "build" ]
then
    if [ $env == "prod" ]
    then
        # 我们以【prod】环境，展开试验
        #
        env="prod"
        #
        echo -e " |a [exec] |a start build ==> build production"    # 提示
        #
        npm run ${command_to_build_prod}      # 进行打包，会生成一个【admin】文件夹，和一个【admin.zip】压缩包
        #
        echo -e " |a [exec] |a clean online www directory ==> and backup"    # 提示
        #
        emptyRemoteDist
        # 后面若要接参数，直接空格后填写。
        #
        echo -e " |a [exec] |a transfer local zip ==> and unzip online"    # 提示
        #
        transferFileToProSever                # 后面若要接参数，直接空格后填写。
        #
        sleep 1s
        echo -e " You succeeded in automatically . Congratulations ! \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a "    # 提示成功
        sleep 1s
        echo -e " You succeeded in automatically . Congratulations ! \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a "    # 提示成功
        sleep 1s
        echo -e " You succeeded in automatically . Congratulations ! \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a "    # 提示成功
        sleep 1s
        echo -e " You succeeded in automatically . Congratulations ! \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a "    # 提示成功
        sleep 1s
        echo -e " You succeeded in automatically . Congratulations ! \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a "    # 提示成功
        sleep 1s
        echo -e " You succeeded in automatically . Congratulations ! \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a "    # 提示成功
        sleep 1s
        echo -e " You succeeded in automatically . Congratulations ! \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a \a "    # 提示成功
        #
    else
         env="sit"
                #
                echo -e " |a [exec] |a start build ==> build sit"    # 提示
                #
                npm run ${command_to_build_sit}      # 进行打包，会生成一个【admin】文件夹，和一个【admin.zip】压缩包
                #
                echo -e " |a [exec] |a clean online www directory ==> and backup"    # 提示
                #
                emptyRemoteDist                       # 后面若要接参数，直接空格后填写。
                #
                echo -e " |a [exec] |a transfer local zip ==> and unzip online"    # 提示
                #
                transferFileToProSever                # 后面若要接参数，直接空格后填写。

    fi  # if结束（镜像关系）
fi  # if结束（镜像关系）
