<!DOCTYPE html>
<html>
<head>
    <title>Meeting Scheduled</title>
</head>
<body>
    <h1>Meeting Scheduled</h1>
    <p>Hello {{ $user->name }},</p>
    <p>You have a meeting scheduled with a teacher.</p>
    <p>Meeting Date: {{ $meeting->selected_date }}</p>
    <p>Meeting Time: {{ $meeting->selected_time }}</p>
    <p>Thank you!</p>
</body>
</html>
