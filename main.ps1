param(
    [String]$algorithm = "SHA256",
    [String]$fh
)

if (-not $fh) {
    Write-Error "You must specify a file path."
    exit
}

$cert_to_verify = (certutil.exe -hashfile $fh $algorithm)[1].Trim()
Write-Output "The hash is $cert_to_verify"


