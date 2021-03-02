$(function() {
    // 注册点击
    $('#goreg').on('click', function() {
            $('.login_box').hide();
            $('.reg_box').show();
        })
        // 登录点击
    $('#gologin').on('click', function() {
            $('.login_box').show();
            $('.reg_box').hide();
        })
        // 密码验证
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            repwd: function(value) {
                var pwd = $('.reg_box [name = password]').val();
                console.log(pwd);
                if (pwd !== value) {
                    return '两次密码不一样，请重新输入';
                }
            }
        })
        // 注册发起请求
    $('#form-reg').on('submit', function(e) {
            e.preventDefault();
            $.post('/api/reguser', { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() }, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录');
                $('#gologin').click();
            })
        })
        // 登录
    $('#form-login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                localStorage.setItem("token", res.token)
                location.href = '/index.html';
            }
        })
    })


})