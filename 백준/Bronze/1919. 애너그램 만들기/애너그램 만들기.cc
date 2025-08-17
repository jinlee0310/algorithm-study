#include <iostream>
#include <string>

using namespace std;

int main()
{
    string str1,str2;

    cin >> str1 >> str2;
    
    int arr1[26]={0,};
    int arr2[26]={0,};

    for(int i=0;i<str1.length();i++){
        arr1[str1[i]-'a']++;
    }
    for(int i=0;i<str2.length();i++){
        arr2[str2[i]-'a']++;
    }

    int cnt=0;
    for(int i=0;i<26;i++){
        if(arr1[i]!=arr2[i]){
            cnt+=abs(arr1[i]-arr2[i]);
        }
    }
    cout << cnt;
    return 0;
}