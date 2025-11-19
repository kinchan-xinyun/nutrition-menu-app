import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import csv

# 1. Firebase Admin SDKの初期化
cred = credentials.Certificate('menu-calorie-calculator-6934f-firebase-adminsdk-fbsvc-73362a7835.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

# 2. CSVファイルのパス
csv_file_path = 'menu.csv' # ファイル名を変更

# 3. Firestoreにデータを書き込むコレクション名
collection_name = 'menuItems' # 例: メニュー項目を保存するコレクション名

print(f"'{csv_file_path}' からデータを読み込み、Firestoreの '{collection_name}' コレクションに書き込みます...")

with open(csv_file_path, mode='r', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)

    for row_number, row in enumerate(csv_reader):
        try:
            # Firestoreに保存するドキュメントデータを準備
            # 日本語のフィールド名を英語にマッピングし、データ型を変換
            doc_data = {
                'category': row['カテゴリー'],
                'dishName': row['料理名'],
                'protein': float(row['タンパク質']),  # float型に変換
                'fat': float(row['脂質']),            # float型に変換
                'carbohydrates': float(row['炭水化物']), # float型に変換
                'totalCalories': float(row['総カロリー']),# float型に変換
                'imageUrl': row['画像パス'],
                'isAvailable': True if row['販売状態'] == '販売中' else False # '販売中'ならTrue、そうでなければFalse
            }

            # ドキュメントIDの決定
            # ここでは「料理名」をドキュメントIDとして使用します。
            # もし料理名が重複する可能性がある場合は、Firestoreに自動生成させるか、
            # CSVにユニークなID列を追加することを検討してください。
            doc_id = row['料理名']
            
            doc_ref = db.collection(collection_name).document(doc_id)
            doc_ref.set(doc_data)

            print(f"  - Document '{doc_id}' (Row {row_number + 1}) を作成/更新しました。")
        except KeyError as e:
            print(f"  - エラー: CSVファイルに予期しないヘッダーが含まれています - {e}")
            print(f"  - 処理中の行データ: {row}")
        except ValueError as e:
            print(f"  - エラー: 数値変換に失敗しました - {e}")
            print(f"  - 処理中の行データ: {row}")
        except Exception as e:
            print(f"  - 不明なエラー: Row {row_number + 1} の処理中に問題が発生しました - {e}")
            print(f"  - 処理中の行データ: {row}")

print("インポート処理が完了しました。")
