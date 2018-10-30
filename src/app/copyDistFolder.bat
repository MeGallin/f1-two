IF EXIST "C:\xampp\htdocs\WebSitesDesigns\live\f1-ng6" (
del /S /Q "C:\xampp\htdocs\WebSitesDesigns\live\f1-ng6"
robocopy "C:\xampp\htdocs\WebSitesDesigns\angular2\f1-ng6\dist" "C:\xampp\htdocs\WebSitesDesigns\live" /s
) ELSE (
robocopy "C:\xampp\htdocs\WebSitesDesigns\angular2\f1-ng6\dist" "C:\xampp\htdocs\WebSitesDesigns\live" /s
)
