$(document).ready(function () {
		 	function displayUsers (data) {
                var tr;
                var iconsArray = ['fa-search', 'fa-toggle-up','fa fa-trash fa-1', 'fa-link','fa fa-pencil-square-o']
                $('table').find("tr:gt(0)").remove();
                    $('#userName').val('');
                    $('#email').val('');
                    $('#password').val('');
                for (var i = 0; i < data.responseJSON.length; i++) {
                    tr = $('<tr class="datas"/>');
                    trash = $('.trash');
                    tr.append('<td class="userName">' + data.responseJSON[i].userName + '</td>');
                    tr.append('<td>' + data.responseJSON[i].email + "</td>");
                    tr.append('<td><i id="trash"  class="fa '+ iconsArray[2] +'"></i><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><i id="update" class="fa edit' + iconsArray[4] + '"></i></td>');
                    tr.click(function(){
                        $('#userName').val($(this).find('td').eq(0).html());
                        $('#email').val($(this).find('td').eq(1).html());
                    });
                    $('table').append(tr);
                }

                //Delete User

                $('td i').closest("tr").find('#trash').click(function(e){
                	e.preventDefault();	
                	var user = {
                    username:  $(this).closest("tr").find(".userName").text()
                	};  
                	console.log(user); 
	                	$.ajax({
	                    url: "/delete",
	                    type: "DELETE",
	                    contentType: "application/json",
	                    processData: false,
	                    data: JSON.stringify(user),
	                    complete: function () {                     
	                        $.ajax({
	                            url: "/users",
	                            type: "GET",
	                            contentType: "application/json",
	                            complete: displayUsers
	                        });
	                    }
	                });               
                });	

                //Update user
                 $('td i').closest("tr").find('#update').click(function(e){
                	e.preventDefault();	
                	var user = {
                    username:  $(this).closest("tr").find(".userName").text()
                	}; 
                	$('#userName').val(JSON.stringify(user));
                    $('#email').val($(tr).find('td').eq(1).html());
                });
                var countUser = ($('#table tr').length - 1);
				console.log(countUser);
				$("#userNumber").text(countUser);
	        }

            $.ajax({
                url: "/users",
                type: "GET",
                contentType: "application/json",
                complete: displayUsers
            });

            // Submit button
            $('#user-submit').click(function(e){
                e.preventDefault();
                var user = {
                    userName:  $('#userName').val(),
                    email:      $('#email').val(),
                    password: $('#password').val()
                };  
                $.ajax({
                    url: "/users",
                    type: "POST",
                    contentType: "application/json",
                    processData: false,
                    data: JSON.stringify(user),
                    complete: function () {                     
                        $.ajax({
                            url: "/users",
                            type: "GET",
                            contentType: "application/json",
                            complete: displayUsers
                        });
                    }
                });
            });
            $('#clear_user').click(function () {
            });

        });